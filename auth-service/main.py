from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from auth import register_user, authenticate_user, generate_token
from db_handler import startup_db, shutdown_db, get_db
from asyncpg import Connection
from typing import AsyncGenerator
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from asyncpg.exceptions import UniqueViolationError
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await startup_db()
    yield
    await shutdown_db()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lub konkretny frontend origin, np. "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class RegisterRequest(BaseModel):
    nickname: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

async def get_connection() -> AsyncGenerator[Connection, None]:
    async for conn in get_db():
        yield conn

@app.post("/register")
async def register(data: RegisterRequest, db: Connection = Depends(get_connection)):
    try:
        user_id = await register_user(data.nickname, data.email, data.password, db)
        return {"status": "ok", "user_id": user_id}
    except UniqueViolationError:
        raise HTTPException(status_code=400, detail="Nickname or email already exists.")
    except Exception as e:
        logger.error(f"Unexpected DB error during registration: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/login")
async def login(data: LoginRequest, db: Connection = Depends(get_connection)):
    user = await authenticate_user(data.email, data.password, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    token = generate_token(user["id"])
    return {"access_token": token}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)