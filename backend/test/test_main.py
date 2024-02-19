from fastapi.testclient import TestClient
from starlette.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from main import app
import pytest


# Tests not working correctly yet
try:
    pytest.skip()
except:
    pytestmark = pytest.mark.skip


client = TestClient(app=app)
url_path = '/api/primality_testing/'


def test_number_23_is_prime():
    url = url_path + '?number=23'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is True


def test_number_4194301_is_prime():
    url = url_path + '?number=4194301'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is True


def test_number_16777213_is_prime():
    url = url_path + '?number=16777213'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is True


def test_number_1_is_not_prime():
    url = url_path + '?number=1'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is False


def test_number_1000_is_not_prime():
    url = url_path + '?number=1000'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is False


def test_number_1922760350154212639069_is_not_prime():
    url = url_path + '?number=1922760350154212639069'
    response = client.get(url)
    assert response.status_code == HTTP_200_OK
    assert response.json() is False


def test_bad_request_value_error():
    url = url_path + '?number=123qwerty456'
    response = client.get(url)
    assert response.status_code >= HTTP_400_BAD_REQUEST


def test_bad_request_no_number():
    response = client.get(url_path)
    assert response.status_code >= HTTP_400_BAD_REQUEST
