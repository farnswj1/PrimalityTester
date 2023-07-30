from httpx import AsyncClient
from main import app
import asyncio
import pytest


@pytest.fixture(scope='session')
def anyio_backend():
    return 'asyncio'
