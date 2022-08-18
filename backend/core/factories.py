from django.utils import timezone
from factory.django import DjangoModelFactory
from factory import Faker, LazyFunction
from core.models import IPAddress


class IPAddressFactory(DjangoModelFactory):
    ip_address = Faker('ipv4')
    date_added = LazyFunction(timezone.now)
    last_request = LazyFunction(timezone.now)

    class Meta:
        model = IPAddress
