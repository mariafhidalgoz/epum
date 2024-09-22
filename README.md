# Docker containers

## API to download the data

This API has the `/data` endpoint, which allows to download the data
from [Houston Public Utilities](https://geogimsprod.houstontx.gov/Html5Viewer/index.html?viewer=PublicUtilities).
By default, it will download `WaterUtilitiesScaled`, `WastewaterUtilitiesScaled`, and `Stormdrain` with some specific
layers as shown below.

 Source     | Layer Id                     | Layer Name 
------------|------------------------------|------------
 Water      | Gravity Main 24" and Larger  | 22         
 Wastewater | Pump Pressure Main (By Type) | 22         
 Wastewater | Manhole                      | 16         
 Stormdrain | Stormdrain Gravity Mains     | 12         

### Running API

Build image

```shell
docker build -t docker-fast-api -f docker/Dockerfile.fast-api .
```

Run container

```shell
docker run -d --name fast-api -p 80:80 docker-fast-api
```

Update/Run the data downloading

```shell
curl --request GET -sL \
     --url 'http://0.0.0.0/data'
```

## Web Mapping to visualice the data downloade above

This user interface is using React and Mapbox. The layers shown in the map can be hidden/shown with the toggle
functionality.

### Running Web Mapping - UI

Build image

```shell
docker build -t docker-react-ui -f docker/Dockerfile.react-ui .
```

Run container

```shell
docker run -d --name react-ui -p 3000:3000 docker-react-ui
```
