# base image
FROM python:3.9

# set environment variables
ENV PYTHONUNBUFFERED 1

# set directory
WORKDIR /backend

# add application and install dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile
COPY backend supervisord.conf docker-entrypoint.sh ./

# entrypoint
RUN chmod a+x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
