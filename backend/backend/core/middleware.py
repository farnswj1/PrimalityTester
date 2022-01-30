from core.models import IPAddress
from core.functions import get_client_ip


class IPAddressMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        client_ip = get_client_ip(request)
        IPAddress.objects.update_or_create(ip_address=client_ip)
        return self.get_response(request)
