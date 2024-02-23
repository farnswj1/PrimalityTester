const numberRegex = /^[1-9]\d*$/;

export const validate = (value: string): boolean => {
  return numberRegex.test(value);
};
