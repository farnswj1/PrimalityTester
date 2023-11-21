from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi_limiter import FastAPILimiter
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from contextlib import asynccontextmanager
from cache.redis import redis
from routes import router
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await FastAPILimiter.init(redis)
    yield
    await FastAPILimiter.close()


app = FastAPI(
    title='Primality Tester',
    description='This is the Primality Tester API.',
    version='1.0.0',
    docs_url='/api/docs',
    redoc_url='/api/redoc',
    openapi_url='/api/openapi.json',
    lifespan=lifespan
)
app.add_middleware(
    ProxyHeadersMiddleware,
    trusted_hosts=settings.ALLOWED_HOSTS
)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=settings.CORS_ALLOW_ORIGIN_REGEX
)
app.include_router(router)
