import geojsonWater22 from "./geojson_Pump Pressure Main (By Type).geojson"
import geojsonWastewater16 from "./geojson_Control Valve.geojson"
import geojsonWastewater22 from "./geojson_Gravity Main 24\" and Larger.geojson"
import geojsonStormdrain12 from "./geojson_Stormdrain Gravity Mains.geojson"


const data_services = [
  {
    "id": "water",
    "name": "Water",
    "layers": [
      {
        "id": "water22",
        "name": "Pump Pressure Main (By Type)",
        "layer_url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/WaterUtilitiesScaled/MapServer/22/query",
        "geojson": geojsonWater22,
        "type": "line",
        "paint": {
          "line-color": "#0015ff",
          "line-width": 2
        },
      },
    ],
  },
  {
    "id": "wastewater",
    "name": "Wastewater",
    "layers": [
      {
        "id": "wastewater16",
        "name": "Control Valve",
        "layer_url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/WastewaterUtilitiesScaled/MapServer/16/query",
        "geojson": geojsonWastewater16,
        "type": "circle",
        "paint": {
          "circle-color": "#ff0000",
          "circle-width": 2
        },
      },
      {
        "id": "wastewater22",
        "name": "Gravity Main 24\" and Larger",
        "layer_url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/WastewaterUtilitiesScaled/MapServer/22/query",
        "geojson": geojsonWastewater22,
        "type": "line",
        "paint": {
          "line-color": "#ff0000",
          "line-width": 2
        },
      }
    ]
  },
  {
    "id": "stormdrain",
    "name": "Stormdrain",
    "layers": [{
      "id": "stormdrain12",
      "name": "Stormdrain Gravity Mains",
      "layer_url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/Stormdrain/MapServer/12/query",
      "geojson": geojsonStormdrain12,
      "type": "line",
      "paint": {
        "line-color": "#00b2ff",
        "line-width": 2
      },
    }]
  }
]


export { data_services }