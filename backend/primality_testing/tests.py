from django.urls import reverse_lazy
from rest_framework.test import APITestCase
from rest_framework import status
from primality_testing.functions import sieve_of_eratosthenes, miller_rabin

# Create your tests here.
class TestFunctions(APITestCase):
    def test_sieve_of_eratosthenes(self):
        primes_under_50 = sieve_of_eratosthenes(50)
        expected_primes_under_50 = {
            2, 3, 5, 7, 11, 13, 17, 19,
            23, 29, 31, 37, 41, 43, 47
        }
        self.assertEqual(primes_under_50, expected_primes_under_50)

        primes_under_100 = sieve_of_eratosthenes(100)
        expected_primes_under_100 = {
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
            43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
        }
        self.assertEqual(primes_under_100, expected_primes_under_100)

    def test_miller_rabin(self):
        self.assertTrue(miller_rabin(101))
        self.assertTrue(miller_rabin(8191))
        self.assertTrue(miller_rabin(1_000_000_007))
        self.assertFalse(miller_rabin(1000))
        self.assertFalse(miller_rabin(1_000_004))
        self.assertFalse(miller_rabin(1_234_567_890))


class TestPrimalityTestAPIView(APITestCase):
    url_path = reverse_lazy('api:primality_testing:primality_test')

    def test_url_path(self):
        self.assertEqual(self.url_path, '/api/primality_testing/')

    def test_number_23_is_prime(self):
        url_path_with_params = self.url_path + '?number=23'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('result'))

    def test_number_4194301_is_prime(self):
        url_path_with_params = self.url_path + '?number=4194301'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('result'))

    def test_number_16777213_is_prime(self):
        url_path_with_params = self.url_path + '?number=16777213'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('result'))

    def test_number_1_is_not_prime(self):
        url_path_with_params = self.url_path + '?number=1'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data.get('result'))

    def test_number_1000_is_not_prime(self):
        url_path_with_params = self.url_path + '?number=1000'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data.get('result'))

    def test_number_1922760350154212639069_is_not_prime(self):
        url_path_with_params = self.url_path + '?number=1922760350154212639069'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data.get('result'))

    def test_bad_request(self):
        url_path_with_params = self.url_path + '?number=123qwerty456'
        response = self.client.get(url_path_with_params, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data.get('error'))
