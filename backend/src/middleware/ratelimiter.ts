import { NextFunction, Request, Response } from 'express';
import { redis } from 'libs';

interface RateLimitRule {
  endpoint: string;
  time: number;
  limit: number;
}

/**
 * Rate limiter middleware to limit the number of requests to a specific endpoint.
 * @param rule - The rate limit rule containing the endpoint, time, and limit.
 * @returns Middleware function to be used in Express routes.
 */
const ratelimiter = (rule: RateLimitRule) => {
  const { endpoint, time, limit } = rule;
  return async (request: Request, response: Response, next: NextFunction) => {
    const key = `ratelimiter:${endpoint}:${request.ip}`;
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
