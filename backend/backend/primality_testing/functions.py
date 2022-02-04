from django.core.cache import cache
from math import sqrt


def sieve_of_eratosthenes(n: int) -> set[int]:
    cache_name = f'sieve_of_eratosthenes_{n}'
    result = cache.get(cache_name)

    if not result:
        sieve = [True] * n

        sieve[0] = False
        sieve[1] = False

        for i in range(2, int(sqrt(n)) + 1):
            if sieve[i]:
                for k in range(i * 2, n, i):
                    sieve[k] = False
        
        result = set(number for number in range(n) if sieve[number])
        cache.set(cache_name, result, 86400)
    
    return result


def miller_rabin(n: int) -> bool:
    if n == 2 or n == 3:
        return True
    elif n % 2 == 0:
        return False
    
    m = n - 1
    t = 0

    while m % 2 == 0:
        m = m // 2
        t += 1
    
    candidates = sieve_of_eratosthenes(100)

    for number in candidates:
        v = pow(number, m, n)

        if not v == 1 and not v == n - 1:
            i = 0

            while v != n - 1:
                if i == t - 1:
                    return False
                else:
                    i += 1
                    v = (v ** 2) % n
                    
                    if v == 1:
                        return False
    return True


def is_prime(n: int) -> bool:
    if n < 2:
        return False
    
    sieve_list = sieve_of_eratosthenes(1_000_000)

    if n < 1_000_000:
        return n in sieve_list
    
    for prime in sieve_list:
        if n % prime == 0:
            return False
    
    return miller_rabin(n)
