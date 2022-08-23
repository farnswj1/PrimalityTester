from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.utils import timezone
from django.conf import settings
from celery import shared_task
from core.models import IPAddress
from datetime import timedelta
from smtplib import SMTPException
import logging

logger = logging.getLogger(__name__)


@shared_task(name='core.send_daily_use_statistics_email')
def send_daily_use_statistics_email() -> None:
    yesterday = timezone.now().date() - timedelta(days=1)
    yesterday_as_str = yesterday.strftime('%m/%d/%Y')

    number_of_users = IPAddress.objects.filter(last_request__date=yesterday).count()
    number_of_new_users = IPAddress.objects.filter(date_added__date=yesterday).count()

    context = {
        'date': yesterday_as_str,
        'number_of_users': number_of_users,
        'number_of_new_users': number_of_new_users
    }

    subject = 'Daily Use Statistics - ' + yesterday_as_str
    html_message = render_to_string('mail/daily_use_statistics.html', context=context)
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [settings.EMAIL_HOST_USER]

    try:
        send_mail(
            subject,
            plain_message,
            from_email,
            to,
            html_message=html_message,
            fail_silently=False
        )
    except SMTPException as e:
        logger.error(f'Failed to send email: {subject} ({e})')
    else:
        logger.info('Successfully sent email: ' + subject)
