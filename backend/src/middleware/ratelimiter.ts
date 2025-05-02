import { NextFunction, Request, Response } from 'express';
import { redis } from 'libs';

/**
 * Interface to define the rate limit rules.
 */
interface RateLimitRule {
  /**
   * The endpoint or namespace for which the rate limit applies.
   * This is used to differentiate between different rate limits.
   * For example, you might have different limits for different APIs.
   * @example 'api'
   */
  namespace: string;
  /**
   * The time in seconds for the rate limit to expire.
   * For example, if this is set to 60, the limit will reset after 60 seconds.
   * @example 60
   */
  time: number;
  /**
   * The maximum number of requests allowed within the time frame.
   * For example, if this is set to 5, a user can make 5 requests within the time frame.
   * If they exceed this limit, they will receive a `429 Too Many Requests` response.
   * @example 5
   */
  limit: number;
}

/**
 * Rate limiter middleware to limit the number of requests to a specific namespace.
 * @param rule - The rate limit rule containing the namespace, time, and limit.
 * @returns Middleware function to be used in Express routes.
 */
const ratelimiter = (rule: RateLimitRule) => {
  const { namespace, time, limit } = rule;
  return async (request: Request, response: Response, next: NextFunction) => {
    const key = `ratelimiter:${namespace}:${request.ip}`;
    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, time);
    }

    if (requests > limit) {
      response.status(429).json('Too many requests!');
      return;
    }

    next();
  };
};

export default ratelimiter;
