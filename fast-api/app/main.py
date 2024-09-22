import json
from pathlib import Path

import requests
from fastapi import FastAPI, HTTPException
from osgeo import gdal

from constants import ARCGIS_SERVICES_URL, PATH_DOWNLOAD

app = FastAPI()

gdal.UseExceptions()


@app.get("/data")
async def download_arcgis_data():
    """
    Download data from the ArcGIS service.
    """

    data_services = []
    for service_name, service_data in ARCGIS_SERVICES_URL.items():
        service_url = service_data["url"]
        skip_layers_from_service = (
            service_data["skip_layers"] if "skip_layers" in service_data else None
        )
        download_only = (
            service_data["download_only_layers"]
            if "download_only_layers" in service_data
            else None
        )
        layers_service = await get_layers(
            service_url, skip_layers_from_service, download_only
        )

        service_id = service_name.lower()
        geojson_list = []
        for layer in layers_service["layers"]:
            layer_id = layer["id"]
            layer_url = f"{service_url}/{layer_id}/query"
            epsg = layers_service["epsg"]
            mapbox_layer_type = getMapboxLayerType(layer["type"])
            geojson_file = await get_geojson_file(layer_url, layer["name"], epsg)
            geojson_list.append(
                {
                    "id": f"{service_id}{layer_id}",
                    "name": layer["name"],
                    "layer_url": layer_url,
                    "geojson_file": geojson_file,
                    "type": mapbox_layer_type,
                }
            )

        data_services.append(
            {"id": service_id, "name": service_name, "layers": geojson_list}
        )

    return {"data_services": data_services}


async def get_layers(
    service_url: str, skip_layers_from_service: list = None, download_only: list = None
) -> dict:
    """
    Get Layers from the ArcGIS Service.
    Parameters:
    - service_url
    """
    params = {
        "where": "1=1",  # Basic query to get all data
        "returnGeometry": "false",
        "outFields": "layers, spatialReference",
        "f": "json",  # Return response in JSON format
    }

    response = await request_rest_api(service_url, params=params)

    # Filter layers
    layers = []
    for layer in response["layers"]:
        layer_id = layer["id"]
        if skip_layers_from_service and layer_id in skip_layers_from_service:
            continue
        if download_only and layer_id not in download_only:
            continue
        layers.append(
            {"id": layer["id"], "name": layer["name"], "type": layer["geometryType"]}
        )

    return {
        "service_url": service_url,
        "layers": layers,
        "epsg": response["spatialReference"]["latestWkid"],
    }


async def get_geojson_file(url: str, name: str, epsg: str) -> Path:
    """
    Get GeoJson File from a ArcGIS Layer.
    Parameters:
    - url
    - name
    - epsg
    """
    params = {
        "where": "1=1",  # Basic query to get all data
        "returnGeometry": "true",
        "f": "json",  # Return response in GeoJSON format
        "resultRecordCount": 1000,  # Max records per page
    }

    all_data_layer = await fetch_paginated_data(url, params=params)  # Esri JSON data
    esri_json_file_name = f"esri_json_{name}"
    geojson_file_name = f"geojson_{name}"
    esri_json = await create_esri_json_file(all_data_layer, esri_json_file_name)
    geojson = await convert_esri_json_to_geojson_file(
        esri_json, epsg, geojson_file_name
    )

    return geojson


async def create_esri_json_file(data, file_name) -> Path:
    """
    Create Json File of Esri Data
    Params:
    - data: Esri JSON data response
    - file_name: File Name of the Esri JSON
    """
    esri_json = Path(f"{file_name}.json")
    # Save the data to a JSON file
    with open(esri_json, "w") as json_file:
        json.dump(data, json_file, indent=4)

    return esri_json


async def convert_esri_json_to_geojson_file(
    esri_json: Path, epsg_source: str, file_name: str
) -> Path:
    """
    Convert ESRI Json file to geojson
    Params:
    - esri_json: Path of the Esri JSON File
    - epsg_source: EPSG Source of the Layer
    - file_name: File Name of the geojson
    """
    geojson = Path(f"{PATH_DOWNLOAD}/{file_name}.geojson")
    epsg_target = "4326"  # Spatial Reference: WGS84 (for GeoJSON compatibility)

    options = f'-f GeoJSON -t_srs "EPSG: {epsg_target}" -s_srs "EPSG: {epsg_source}"'
    gdal.VectorTranslate(geojson, esri_json, options=options)

    esri_json.unlink()

    return geojson


async def fetch_paginated_data(api_url: str, params: dict = None) -> list:
    """
    Fetch data including pagination
    Params:
    - api_url: URL of the data to be requested.
    - params: Param to fetch the data.
    """
    all_data = []  # To store all data
    result_offset = 0  # Starting point for pagination

    while True:
        # Update params with the current page
        params["resultOffset"] = result_offset

        # Make the API request
        data = await request_rest_api(api_url, params=params)

        # If the response has data, add it to the list
        if "features" in data:
            if all_data:
                # Include the next results
                all_data["features"].extend(data["features"])
            else:
                # If all_data is empty we set it with the first result
                all_data = data
        else:
            print(f"No results found on offset {result_offset}")
            break

        # Check if there are more pages
        if 'exceededTransferLimit' not in data or not data['exceededTransferLimit']:
            break  # No more pages, exit the loop

        # Update offset for the next page
        result_offset += params["resultRecordCount"]

        print(f"Fetched {len(all_data['features'])} records so far...")

    return all_data


async def request_rest_api(url: str, params: dict) -> dict:
    """
    Fetch data.
    Parameters:
    - url
    - params
    """
    try:
        # Make the request
        response = requests.get(url, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Error fetching data from {url}",
            )
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {e}")


def getMapboxLayerType(esri_type):
    if esri_type in ["esriGeometryPoint", "esriGeometryMultipoint"]:
        return "circle"
    elif esri_type in ["esriGeometryPolyline"]:
        return "line"
    elif esri_type in ["esriGeometryPolygon"]:
        return "fill"
    else:
        return None
