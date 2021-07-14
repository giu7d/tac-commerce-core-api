# Tópicos Avançados - Back-end

## How to run

```bash
# build image
$ docker build . -t "ta-api"

# start
$ docker run -d -e "PORT=5000" -p 5000:5000 --name ta-api ta-api
```

## Testing

```
yarn test
```
