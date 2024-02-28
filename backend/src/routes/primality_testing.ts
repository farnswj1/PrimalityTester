import { Router, Request, Response } from 'express';
import { isPrime, memoize, validate } from 'libs';
import { INumber } from 'types';

const isPrimeMemoized = memoize(isPrime, 86400);

const router = Router();

router.get(
  '/primality_testing/',
  async (request: Request<{}, any, any, INumber>, response: Response) => {
    const { number } = request.query;

    if (!validate(number)) {
      response.status(400).json('Please enter a positive integer!');
      return;
    }

    const result = await isPrimeMemoized(BigInt(number));
    response.status(200).json(result);
  }
);

export default router;
