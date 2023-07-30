from cache.redis.decorators import cache
from math import sqrt


@cache(timeout=None)
async def sieve_of_eratosthenes(n: int) -> set[int]:
    """Get a set of primes under n."""
    sieve = [True] * n

    sieve[0] = False
    sieve[1] = False

    for i in range(2, int(sqrt(n)) + 1):
        if sieve[i]:
            for k in range(i * 2, n, i):
                sieve[k] = False

    return set(number for number, is_prime in enumerate(sieve) if is_prime)


async def miller_rabin(n: int) -> bool:
    """Use the Miller-Rabin primality test to determine if a number is prime."""
    if n == 2 or n == 3:
        return True
    elif n % 2 == 0:
        return False

    m = n - 1
    t = 0

    while m % 2 == 0:
        m = m // 2
        t += 1

    candidates = await sieve_of_eratosthenes(100)

    for number in candidates:
        v = pow(number, m, n)

        if v != 1 and v != n - 1:
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


async def is_prime(n: int) -> bool:
    """Determine if the number is a prime or not."""
    if n < 2:
        return False

    sieve_list = await sieve_of_eratosthenes(1_000_000)

    if n < 1_000_000:
        return n in sieve_list

    for prime in sieve_list:
        if n % prime == 0:
            return False

    return await miller_rabin(n)
