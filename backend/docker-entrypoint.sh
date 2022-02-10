#!/bin/bash

python manage.py collectstatic --noinput
python manage.py migrate
supervisord -c supervisord.conf -n
