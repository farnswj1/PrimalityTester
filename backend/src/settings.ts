import dotenv from 'dotenv';

dotenv.config();

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS!.split(' ');
export const REDIS_URL = process.env.REDIS_URL!;
export const PORT = parseInt(process.env.PORT ?? '8000', 10);
