# Primality Tester
This web app determines whether or not a number is prime. 


## Setup
The project uses the following:
- Python 3
- TypeScript
- Django
- Celery
- NPM
- React
- Material-UI
- PostgreSQL
- Redis
- Nginx
- Travis CI
- Docker
- Docker Compose

For additional information on project specifications, see 
```backend/Pipfile``` for the backend server and 
```frontend/package.json``` for the frontend respectively.


### PostgreSQL
In the ```postgres``` directory, create a ```.env``` file 
that contains the following environment variables:

```
POSTGRES_DB=primality_tester
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```


### Backend
In the ```backend``` directory, create a ```.env``` file 
that contains the following environment variables:

```
SECRET_KEY=somerandomstring
DEBUG=False

ALLOWED_HOSTS=localhost 127.0.0.1
CORS_ALLOWED_ORIGIN_REGEXES=^https?://(localhost|127\.0\.0\.1)$
CSRF_TRUSTED_ORIGINS=http://localhost http://127.0.0.1

DB_ENGINE=django.db.backends.postgresql_psycopg2
DB_NAME=primality_tester
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

REDIS_URL=redis://redis:6379/0

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=password
```

The database variables can be changed as desired. 
However, make sure to update the environment variables in 
```postgres/.env``` as well.

The email configurations can also be configured. 
For more information, see the Django 4.0 documentation.


### Frontend
The ```frontend``` directory must also have a ```.env``` file 
with the following variables:
```
REACT_APP_API_URL=http://127.0.0.1
```
The URL should be the endpoint of the backend server.


## Building
The project uses Docker. Ensure Docker and Docker Compose are installed 
before continuing.

To build, run ```docker compose build```


## Running
To run the web app, run ```docker compose up -d```, then
go to http://localhost using your web browser.

You can also monitor and manage asynchronous tasks at 
http://localhost/api/flower using the UI provided by Flower.


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
