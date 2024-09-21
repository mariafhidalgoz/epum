from pathlib import Path

# This path can be changed
PATH_DOWNLOAD = f"{Path.cwd().parent}/react-ui/src/data"

# ArcGIS REST API URL (Add here the desired services URL)
ARCGIS_SERVICES_URL = {
    "Water": {
        "url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/WaterUtilitiesScaled/MapServer",
        "download_only_layers": [
            22,  # Gravity Main 24" and Larger (22)
        ],
    },
    "Wastewater": {
        "url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/WastewaterUtilitiesScaled/MapServer",
        "download_only_layers": [
            22,  # Pump Pressure Main (By Type) (22)
            16,  # Manhole (16)
        ],
    },
    "Stormdrain": {
        "url": "https://geogimstest.houstontx.gov/arcgis/rest/services/HW/Stormdrain/MapServer",
        "download_only_layers": [
            12,  # "Stormdrain Gravity Mains"
        ],
        # "skip_layers": [
        #     23,  #  New Drainage Areas (23)  |  We can also exclude layers
        # ],
    },
}
