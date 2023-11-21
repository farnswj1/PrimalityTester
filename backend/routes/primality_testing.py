from fastapi import APIRouter
from libs.functions import is_prime
from schemas import Result


router = APIRouter(tags=['Primality Testing'])


@router.get('/primality_testing/')
async def primality_testing(number: int) -> Result:
    """Determine if the number prime."""
    result = await is_prime(number)
    return {'result': result}
