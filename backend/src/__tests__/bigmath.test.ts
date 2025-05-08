import { modPow, sqrt } from 'libs';

describe('sqrt', () => {
  test('root of 4 equals 2', () => expect(sqrt(4n)).toBe(2n));
  test('root of 121 equals 11', () => expect(sqrt(121n)).toBe(11n));
  test(
    'root of 15241578750190521n equals 123456789n',
    () => expect(sqrt(15241578750190521n)).toBe(123456789n)
  );
  test('root of 5 floors to 2', () => expect(sqrt(5n)).toBe(2n));
  test('root of 100 floors to 9', () => expect(sqrt(99n)).toBe(9n));
});

describe('modPow', () => {
  test('(2**3) % 10 == 8', () => expect(modPow(2n, 3n, 1000n)).toBe(8n));
  test('(7 ** 8) % 5 == 1', () => expect(modPow(7n, 8n, 5n)).toBe(1n));
  test('(9 ** 12) % 3 == 0', () => expect(modPow(9n, 12n, 3n)).toBe(0n));
  test('(17 ** 23) % 29 == 12', () => expect(modPow(17n, 23n, 29n)).toBe(12n));
  test(
    '(123934973 ** 380552745935) % 1029384756 == 495645401',
    () => expect(modPow(123934973n, 380552745935n, 1029384756n)).toBe(495645401n)
  );
});
