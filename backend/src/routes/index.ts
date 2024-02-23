import { Router } from 'express';
import { RateLimiter } from 'middleware';
import PrimalityTestingRouter from './primality_testing';


const router = Router();
router.use(RateLimiter({ endpoint: 'api', time: 60, limit: 5 }));
router.use(PrimalityTestingRouter);

export default router;
