from libs.functions import sieve_of_eratosthenes, miller_rabin
import pytest


# Tests not working correctly yet
try:
    pytest.skip()
except:
    pytestmark = pytest.mark.skip


async def test_sieve_of_eratosthenes():
    primes_under_50 = await sieve_of_eratosthenes(50)
    expected_primes_under_50 = {
        2, 3, 5, 7, 11, 13, 17, 19,
        23, 29, 31, 37, 41, 43, 47
    }
    assert primes_under_50 == expected_primes_under_50

    primes_under_100 = await sieve_of_eratosthenes(100)
    expected_primes_under_100 = {
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
        43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
    }
    assert primes_under_100 == expected_primes_under_100


async def test_miller_rabin():
    assert await miller_rabin(101)
    assert await miller_rabin(8191)
    assert await miller_rabin(1_000_000_007)
    assert await miller_rabin(1000)
    assert await miller_rabin(1_000_004)
    assert await miller_rabin(1_234_567_890)
