from rest_framework.test import APITestCase
from core.models import IPAddress
from datetime import datetime

# Create your tests here.
class TestIPAddress(APITestCase):
    def setUp(self):
        IPAddress.objects.create(ip_address='192.168.0.1')

    def test_ip_address_created(self):
        ip = IPAddress.objects.get(ip_address='192.168.0.1')
        self.assertIsInstance(ip.date_added, datetime)
        self.assertIsInstance(ip.last_request, datetime)
