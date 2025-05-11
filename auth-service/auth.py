from passlib.hash import argon2
import jwt
import os
from datetime import datetime, timedelta
from db_handler import get_db
from argon2 import PasswordHasher
import logging
from db_operations import insert_user, initialize_statistics, assign_default_skin_to_user;
from asyncpg import UniqueViolationError

JWT_SECRET = os.getenv("JWT_SECRET", "changeme")
JWT_EXPIRE_SECONDS = int(os.getenv("JWT_EXPIRE_SECONDS", 3600))
logger = logging.getLogger(__name__)
    
async def register_user(nickname, email, password, db):
    hashed = argon2.hash(password)

    try:
        user_id = await insert_user(nickname, email, hashed, db)
        await assign_default_skin_to_user(user_id, db)
        await initialize_statistics(user_id, db)
        logger.error(f"User inserted with ID: {user_id}")
        return user_id
    
    except UniqueViolationError as e:
            raise e
    except Exception as e:
        logger.error(f"Unexpected DB error during registration: {e}")
        raise Exception(f"An error occurred while registering the user: {e}")
    
async def authenticate_user(email, password, db):
    user = await db.fetchrow("SELECT * FROM users WHERE email = $1;", email)
    if not user or not argon2.verify(password, user["password_hash"]):
        return None
    return user

def generate_token(user_id):
    expire = datetime.utcnow() + timedelta(seconds=JWT_EXPIRE_SECONDS)
    payload = {"user_id": user_id, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")