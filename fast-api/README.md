# Running the API

## Locally

Set up virtual environment, using for example [`visrtualenv`](https://pypi.org/project/virtualenv/)

```shell
virtualenv --python=python3.12 .venv
```

Activate environment

```shell
source .venv/bin/activate
```

Install GDL dependencies

```shell
brew install gdal
```

Install requirements with [`poetry`](https://pypi.org/project/poetry/)

```shell
poetry install
```

Start server

```shell
fastapi run app/main.py --port 80
```

Run the downloading

```shell
curl --request GET -sL \
     --url 'http://0.0.0.0/data'
```

**NOTE**:
The files will be downloaded in `/react-ui/src/data`.
This path can be changed it [constants.py](./fast-api/app/constants.py) 
