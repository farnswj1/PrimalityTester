import { Router, Request, Response } from 'express';
import { isPrime, redis, validate } from 'libs';
import { INumbers } from 'types';

const router = Router();

router.get(
  '/api/primality_testing/',
  async (request: Request<{}, any, any, INumbers>, response: Response) => {
    const number = request.query.number.trim();

    if (!validate(number)) {
      response.status(400).json('Please enter a positive integer!');
      return;
    }

    const cachedResult = await redis.get(number);
    let result = cachedResult === null ? null : JSON.parse(cachedResult) as boolean;

    if (result === null) {
      result = isPrime(BigInt(number));
      await redis.set(number, String(result), { EX: 3600 });
    }

    response.status(200).json(result);
  }
);

export default router;
