from django.urls import path
from primality_testing import views

app_name = 'primality_testing'

urlpatterns = [
    path('', views.PrimalityTestAPIView.as_view(), name='primality-test'),
]
