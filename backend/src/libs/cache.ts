import { createClient } from 'redis';
import { REDIS_URL } from 'settings';

export const redis = createClient({ url: REDIS_URL });

redis.on('error', error => console.log('Redis Client Error', error));

redis.connect();
