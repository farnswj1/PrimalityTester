from django.contrib import admin
from core.models import User, IPAddress

# Register your models here.
admin.site.register((User, IPAddress))
