from fastapi import APIRouter
from routes.primality_testing import router as primality_testing_router


router = APIRouter(prefix='/api')
router.include_router(primality_testing_router)
