const numberRegex = /^[1-9]\d*$/;

/**
 * Validates if a given string is a positive integer.
 * @param value - The string to be validated.
 * @returns True if the string is a positive integer, false otherwise.
 */
export const validate = (value: string): boolean => {
  return numberRegex.test(value);
};
