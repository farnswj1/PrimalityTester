import dotenv from 'dotenv';

dotenv.config();

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
