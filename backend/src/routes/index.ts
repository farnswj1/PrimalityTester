import { Router } from 'express';
import PrimalityTestingRouter from './primalitytesting';

const router = Router();
router.use(PrimalityTestingRouter);

export default router;
