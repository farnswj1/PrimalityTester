import { createClient } from 'redis';
import { REDIS_URL } from 'settings';

export const redis = createClient({ url: REDIS_URL });

redis.on('error', error => console.log('Redis Client Error', error));

redis.connect();

export const memoize = <T>(func: (...args: any) => T, ex: number = 60) => {
  return async (...args: any): Promise<T> => {
    const key = `${func.name}:${args.toString()}`;
    const cachedResult = await redis.get(key);
    let result = cachedResult !== null ? JSON.parse(cachedResult) as T : null;

    if (result === null) {
      if (func.constructor.name === 'AsyncFunction') {
        result = await func(...args);
      } else {
        result = func(...args);
      }

      await redis.set(key, String(result), { EX: ex });
    }

    return result;
  };
};
