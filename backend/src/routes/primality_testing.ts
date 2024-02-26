import { Router, Request, Response } from 'express';
import { isPrime, redis, validate } from 'libs';
import { INumber } from 'types';

const router = Router();

router.get(
  '/primality_testing/',
  async (request: Request<{}, any, any, INumber>, response: Response) => {
    const { number } = request.query;

    if (!validate(number)) {
      response.status(400).json('Please enter a positive integer!');
      return;
    }

    const cachedResult = await redis.get(number);
    let result = cachedResult === null ? null : JSON.parse(cachedResult) as boolean;

    if (result === null) {
      result = isPrime(BigInt(number));
      await redis.set(number, String(result), { EX: 86400 });
    }

    response.status(200).json(result);
  }
);

export default router;
