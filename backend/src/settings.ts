import dotenv from 'dotenv';

dotenv.config();

/**
 * Retrieves the value of an environment variable.
 * If the variable is not defined and `required` is true, an error is thrown.
 * If the variable is not defined and `required` is false, an empty string is returned.
 * @param key - Environment variable key.
 * @param required - Indicates if the variable is required.
 * @returns The value of the environment variable.
 * @throws If the variable is required but not defined.
 */
const getEnv = (key: string, required: boolean = true): string => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }

  return value ?? '';
};

export const ALLOWED_ORIGINS = getEnv('ALLOWED_ORIGINS').split(' ');
export const REDIS_URL = getEnv('REDIS_URL');
export const PORT = parseInt(getEnv('PORT', false) || '8000', 10);
