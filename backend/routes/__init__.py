from fastapi import APIRouter, Depends
from fastapi_limiter.depends import RateLimiter
from routes.primality_testing import router as primality_testing_router


router = APIRouter(
    prefix='/api',
    dependencies=[Depends(RateLimiter(times=5, minutes=1))]
)
router.include_router(primality_testing_router)
