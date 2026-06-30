import { Router } from "express";
import { ratelimiter } from "~/middleware";
import PrimalityTestingRouter from "./primalitytesting";

const router = Router();
router.use(ratelimiter({ namespace: "api", time: 60, limit: 5 }));
router.use(PrimalityTestingRouter);

export default router;
