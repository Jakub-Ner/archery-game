from db_handler import get_db
from asyncpg import Connection
import logging
from asyncpg import UniqueViolationError
from datetime import datetime

logger = logging.getLogger(__name__)

async def insert_user(nickname: str, email: str, hashed_password: str, db: Connection) -> int:
    try:
        row = await db.fetchrow(
            "INSERT INTO users (id, nickname, email, password_hash, role, gems) VALUES (2, $1, $2, $3, 'USER', 1000) RETURNING id;",
            nickname, email, hashed_password
        )
        return row["id"]
    except UniqueViolationError as e:
        raise e

async def initialize_statistics(user_id: int, db: Connection):
    await db.execute(
        """
        INSERT INTO statistics (
            user_id, games_played, best_score, average_score,
            kills_per_death, total_time_played, account_created_at
        )
        VALUES ($1, 0, 0, 0, 0, 0, $2);
        """,
        user_id, datetime.utcnow()
    )
    logger.info(f"Statistics initialized for user {user_id}")

async def assign_default_skin_to_user(user_id: int, db: Connection):
    try:
        await db.execute(
            """
            INSERT INTO user_skins (user_id, skin_id, is_selected)
            VALUES ($1, 2, TRUE)
            ON CONFLICT (user_id, skin_id) DO NOTHING;
            """,
            user_id
        )
        logger.info(f"Default skin assigned to user {user_id}")
    except Exception as e:
        logger.error(f"Failed to assign default skin to user {user_id}: {e}")
