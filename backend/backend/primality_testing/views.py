from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from primality_testing.functions import is_prime

# Create your views here.
class PrimalityTestAPIView(APIView):
    @method_decorator(cache_page(86400))
    def get(self, request, format=None, *args, **kwargs):
        try:
            number = int(request.query_params.get('number'))
        except (ValueError, TypeError):
            error = {'error': 'Please enter a number.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)
        else:
            result = {'result': is_prime(number)}
            return Response(result, status=status.HTTP_200_OK)
