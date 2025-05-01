/**
 * Calculates the square root of a given value.
 * @param value - The value to be square rooted.
 * @returns The square root of the given value.
 * @throws {Error} If the value is negative.
 */
export const sqrt = (value: bigint): bigint => {
  if (value < 0n) {
    throw new Error('Square root of negative numbers is not supported!');
  } else if (value < 2n) {
    return value;
  } else if (value < 16n) {
    return BigInt(Math.sqrt(Number(value)) | 0);
  }

  let x0: bigint;
  let x1: bigint;

  if (value < 4503599627370496n) { // 1n << 52n
    x1 = BigInt(Math.sqrt(Number(value)) | 0) - 3n;
  } else {
    const length = value.toString().length;

    if (!(length & 1)) {
      x1 = 10n ** BigInt(length / 2);
    } else {
      x1 = 4n * 10n ** BigInt((length / 2) | 0);
    }
  }

  do {
    x0 = x1;
    x1 = ((value / x0) + x0) >> 1n;
  } while (x0 !== x1 && x0 !== (x1 - 1n));

  return x0;
};

/**
 * Calculates the modular exponentiation of `base` raised to the power of `exp` modulo `mod`.
 * @param base - The base value.
 * @param exp - The exponent.
 * @param mod - The modulus.
 * @returns The result of the modular exponentiation.
 */
export const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
  let result = 1n;
  base %= mod;

  if (base === 0n) {
    return 0n;
  }

  while (exp > 0n) {
    if (exp & 1n) {
      result = (result * base) % mod;
    }

    exp >>= 1n;
    base = (base * base) % mod;
  }

  return result;
};
