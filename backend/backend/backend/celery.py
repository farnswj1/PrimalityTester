from celery import Celery
from celery.schedules import crontab
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.beat_schedule = {
    'send-daily-use-statistics-email': {
        'task': 'core.send_daily_use_statistics_email',
        'schedule': crontab(minute='*')
    }
}

app.autodiscover_tasks()
