from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from auth import register_user, authenticate_user, generate_token
from db_handler import startup_db, shutdown_db, get_db
from asyncpg import Connection
from typing import AsyncGenerator
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await startup_db()
    yield
    await shutdown_db()

app = FastAPI(lifespan=lifespan)

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

async def get_connection() -> AsyncGenerator[Connection, None]:
    async for conn in get_db():
        yield conn

@app.post("/register")
async def register(data: RegisterRequest, db: Connection = Depends(get_connection)):
    try:
        user_id = await register_user(data.username, data.email, data.password, db)
        return {"status": "ok", "user_id": user_id}
    except Exception:
        raise HTTPException(status_code=400, detail="Username or email already exists.")

@app.post("/login")
async def login(data: LoginRequest, db: Connection = Depends(get_connection)):
    user = await authenticate_user(data.username, data.password, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    token = generate_token(user["id"])
    return {"access_token": token}
