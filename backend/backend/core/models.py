from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass


class IPAddress(models.Model):
    ip_address = models.GenericIPAddressField(primary_key=True)
    date_added = models.DateTimeField(auto_now_add=True)
    last_request = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ip_address

    class Meta:
        ordering = ('last_request', 'date_added')
        verbose_name = 'IP Address'
        verbose_name_plural = 'IP Addresses'
