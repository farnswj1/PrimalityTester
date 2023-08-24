# Primality Tester
This web app determines whether or not a number is prime.

## Setup
The project uses the following:
- Python 3
- TypeScript
- FastAPI
- NPM
- React
- Material-UI
- Redis
- Nginx
- Travis CI
- Docker
- Docker Compose

For additional information on project specifications, see
```backend/Pipfile``` for the backend server and
```frontend/package.json``` for the frontend respectively.

### Backend
In the ```backend``` directory, create a ```.env``` file
that contains the following environment variables:
```
ALLOWED_HOSTS=localhost 127.0.0.1
CORS_ALLOW_ORIGIN_REGEX=^https?://(localhost|127\.0\.0\.1)$
REDIS_URL=redis://redis:6379/0
```

### Frontend
The ```frontend``` directory must also have a ```.env``` file
with the following variables:
```
VITE_API_URL=http://127.0.0.1
```
The URL should be the endpoint of the backend server.

## Building
The project uses Docker. Ensure Docker and Docker Compose are installed
before continuing.

To build, run ```docker compose build```

## Running
To run the web app, run ```docker compose up -d```, then
go to http://localhost using your web browser.

### Setting Up HTTPS With Certbot
There are configurations already set up via `cli.ini` in the `certbot` directory.
To receive an SSL certificate using those configurations, run:
```
docker compose run --no-deps --rm certbot certonly -d [enter domain here]
```

Fill out the prompt, then configure Nginx to use the SSL certificate and domain.

To renew the SSL certificate and use the newest certificate, run:
```
docker compose run --no-deps --rm certbot renew && docker exec nginx nginx -s reload
```

**NOTE**: Ensure port 443 is exposed in `docker-compose.yml` for HTTPS.
