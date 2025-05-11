from passlib.hash import argon2
import jwt
import os
from datetime import datetime, timedelta
from db_handler import get_db
from argon2 import PasswordHasher
import logging

JWT_SECRET = os.getenv("JWT_SECRET", "changeme")
JWT_EXPIRE_SECONDS = int(os.getenv("JWT_EXPIRE_SECONDS", 3600))
logger = logging.getLogger(__name__)
    
async def register_user(nickname, email, password, db):

    hashed = argon2.hash(password)

    try:
        row = await db.fetchrow(
            "INSERT INTO users (nickname, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id;",
            nickname, email, hashed, "USER"
        )
        logger.info(f"User inserted with ID: {row['id']}")
        return row["id"]

    except Exception as e:
        logger.error(f"Unexpected DB error during registration: {e}")
        raise Exception(f"An error occurred while registering the user: {e}")
    
async def authenticate_user(nickname, password, db):
    user = await db.fetchrow("SELECT * FROM users WHERE nickname = $1;", nickname)
    if not user or not argon2.verify(password, user["password_hash"]):
        return None
    return user

def generate_token(user_id):
    expire = datetime.utcnow() + timedelta(seconds=JWT_EXPIRE_SECONDS)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")