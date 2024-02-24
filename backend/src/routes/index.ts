import { Router } from 'express';
import PrimalityTestingRouter from './primality_testing';

const router = Router();
router.use(PrimalityTestingRouter);

export default router;
