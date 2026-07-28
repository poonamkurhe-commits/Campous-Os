from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import get_settings
from app.models.college import College
from app.models.faculty import Faculty
from app.models.notification import Notification
from app.models.student import Student
from app.models.user import User

settings = get_settings()
client: AsyncIOMotorClient | None = None


async def init_db() -> None:
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(
        database=client[settings.MONGODB_DB_NAME],
        document_models=[College, User, Student, Faculty, Notification],
    )


async def close_db() -> None:
    global client
    if client:
        client.close()
        client = None
