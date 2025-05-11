import asyncpg
from asyncpg import Pool
import settings as conf

DB_URL = f"postgresql://{conf.USER}:{conf.PASSWORD}@{conf.DB_URL}/{conf.DB_NAME}"

pool: Pool = None


async def startup_db():
    global pool
    pool = await asyncpg.create_pool(DB_URL, min_size=5, max_size=20)


async def shutdown_db():
    await pool.close()


async def get_db():
    async with pool.acquire() as connection:
        yield connection
