from fastapi import APIRouter
from libs.functions import is_prime


router = APIRouter(tags=['Primality Testing'])


@router.get('/primality_testing/')
async def primality_testing(number: int) -> bool:
    """Determine if the number prime."""
    return await is_prime(number)
