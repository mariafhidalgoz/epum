## Running API

# Docker containers

Build image

```shell
docker build -t docker-fast-api -f docker/Dockerfile.fast-api .
```

Run container

```shell
docker run -d --name fast-api -p 80:80 docker-fast-api
```
