# Building and deploying to production

## Docker (Nginx)

Update `.env.[mode]` file or `.env.[mode].local` if needed before proceeding to the next step.

### Development

```bash
# Build docker image
docker build -f Dockerfile-development -t um2c-admin-web:dev .

# Run docker image
docker run -d -p 127.0.0.1:9091:9091 --rm --name um2c-admin-web-dev um2c-admin-web:dev
```

### Testing

```bash
# Build docker image
docker build -f Dockerfile-test -t um2c-admin-web:test .

# Run docker image
docker run -d -p 127.0.0.1:9091:9091 --rm --name um2c-admin-web-test um2c-admin-web:test
```

### Production

```bash
# Build docker image
docker build -f Dockerfile-production -t um2c-admin-web:prd .

# Run docker image
docker run -d -p 127.0.0.1:9091:9091 --rm --name um2c-admin-web-prd um2c-admin-web:prd
```
