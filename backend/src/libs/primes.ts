import { modPow, sqrt } from './bigmath';

const sieveOfEratosthenes = (n: number): Set<bigint> => {
  const sieve = Array<boolean>(n).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  const limit = Math.floor(Math.sqrt(n));

  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      for (let k = i * 2; k < n; k += i) {
        sieve[k] = false;
      }
    }
  }

  const primes = new Set<bigint>();

  for (let index = 0; index < n; index++) {
    if (sieve[index]) {
      primes.add(BigInt(index));
    }
  }

  return primes;
};

const PRIMES_UNDER_1_MILLION = sieveOfEratosthenes(1_000_000);
const PRIMES_UNDER_50 = sieveOfEratosthenes(50);

const millerRabin = (n: bigint): boolean => {
  if (n === 2n || n === 3n) {
    return true;
  } else if (n % 2n === 0n) {
    return false;
  }

  let m = n - 1n;
  let t = 0n;

  while (m % 2n === 0n) {
    m /= 2n;
    t += 1n;
  }

  for (const number of PRIMES_UNDER_50) {
    let v = modPow(number, m, n);

    if (v != 1n && v != n - 1n) {
      let i = 0n;

      while (v != n - 1n) {
        if (i == t - 1n) {
          return false;
        } else {
          i += 1n
          v = (v * v) % n;

          if (v == 1n) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export const isPrime = (n: bigint): boolean => {
  if (n < 2n) {
    return false;
  }

  if (n < 1_000_000n) {
    return PRIMES_UNDER_1_MILLION.has(n);
  }

  const root = sqrt(n);

  for (const prime of PRIMES_UNDER_1_MILLION) {
    if (prime > root) {
      break;
    } else if (n % prime === 0n) {
      return false;
    }
  }

  return millerRabin(n);
};
