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

Install requirements with [`poetry`](https://pypi.org/project/poetry/)

```shell
poetry install
```

Start server

```shell
fastapi run app/main.py --port 80
```
