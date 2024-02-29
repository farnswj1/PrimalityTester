import { createClient } from 'redis';
import { REDIS_URL } from 'settings';

export const redis = createClient({ url: REDIS_URL });

redis.on('error', error => console.log('Redis Client Error', error));

redis.connect();

export const memoize = <P extends unknown[], T>(
  func: (...args: P) => T | Promise<T>,
  ex?: number
) => {
  const isAsync = func.constructor.name === 'AsyncFunction';
  return async (...args: P): Promise<T> => {
    const key = `${func.name}:${args.toString()}`;
    const cachedResult = await redis.get(key);
    let result: T;

    if (cachedResult === null) {
      result = isAsync ? await func(...args) : func(...args) as T;
      await redis.set(key, String(result), { EX: ex });
    } else {
      result = JSON.parse(cachedResult);
    }

    return result;
  };
};
