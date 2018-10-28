#!/bin/sh

python manage.py migrate

exec gunicorn app.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 5
