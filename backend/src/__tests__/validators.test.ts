import { validate } from 'libs';

describe('validators', () => {
  test('validates positive integers', () => {
    expect(validate('1')).toBe(true);
    expect(validate('1234567890')).toBe(true);
    expect(validate('99999999999999999999')).toBe(true);
  });

  test('invalidates non-positive integers', () => {
    expect(validate('0')).toBe(false);
    expect(validate('-1')).toBe(false);
    expect(validate('-1234567890')).toBe(false);
    expect(validate('-99999999999999999999')).toBe(false);
  });

  test('invalidates non-integer values', () => {
    expect(validate('1.5')).toBe(false);
    expect(validate('abc')).toBe(false);
    expect(validate('123abc')).toBe(false);
    expect(validate('!#f3')).toBe(false);
    expect(validate('10e3')).toBe(false);
  });
});
