from rest_framework.test import APITestCase
from core.factories import IPAddressFactory
from datetime import datetime

# Create your tests here.
class TestIPAddress(APITestCase):
    def setUp(self):
        self.ip_address = IPAddressFactory()

    def test_ip_address_created(self):
        octets = tuple(int(octet) for octet in self.ip_address.ip_address.split('.'))
        self.assertTrue(all(0 <= octet <= 255 for octet in octets))
        self.assertIsInstance(self.ip_address.date_added, datetime)
        self.assertIsInstance(self.ip_address.last_request, datetime)
