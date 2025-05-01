import { createClient, SetOptions } from 'redis';
import { REDIS_URL } from 'settings';

export const redis = createClient({ url: REDIS_URL });
redis.on('error', error => console.log('Redis Client Error', error));
redis.connect();

export const memoize = <P extends unknown[], T>(
  func: (...args: P) => T | Promise<T>,
  options?: SetOptions
) => async (...args: P): Promise<T> => {
  const key = `memoize:${func.name}:${args.toString()}`;
  const cachedResult = await redis.get(key);
  let result: T;

  if (cachedResult === null) {
    result = await func(...args);
    await redis.set(key, String(result), options);
  } else {
    result = JSON.parse(cachedResult);
  }

  return result;
};
