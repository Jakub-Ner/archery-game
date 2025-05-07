from passlib.hash import argon2
import jwt
import os
from datetime import datetime, timedelta
from db_handler import get_db

JWT_SECRET = os.getenv("JWT_SECRET", "changeme")
JWT_EXPIRE_SECONDS = int(os.getenv("JWT_EXPIRE_SECONDS", 3600))


async def register_user(username, email, password, db):
    hashed = argon2.hash(password)
    try:
        row = await db.fetchrow(
            "INSERT INTO users_archer (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id;",
            username, email, hashed
        )
        return row["id"]
    except Exception as e:
        raise Exception("Username or email already exists.")


async def authenticate_user(username, password, db):
    user = await db.fetchrow("SELECT * FROM users_archer WHERE username = $1;", username)
    if not user or not argon2.verify(password, user["password_hash"]):
        return None
    return user


def generate_token(user_id):
    expire = datetime.utcnow() + timedelta(seconds=JWT_EXPIRE_SECONDS)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")