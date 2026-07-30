from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import get_settings
from app.models.college import College
from app.models.faculty import Faculty
from app.models.notification import Notification
from app.models.student import Student
from app.models.user import User
from app.models.attendance import Attendance
from app.models.assignment import Assignment
from app.models.submission import Submission
from app.models.result import Result
from app.models.timetable import TimetableEntry

settings = get_settings()
client: AsyncIOMotorClient | None = None


async def init_db() -> None:
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(
        database=client[settings.MONGODB_DB_NAME],
        document_models=[
            College,
            User,
            Student,
            Faculty,
            Notification,
            Attendance,
            Assignment,
            Submission,
            Result,
            TimetableEntry,
        ],
    )


async def close_db() -> None:
    global client
    if client:
        client.close()
        client = None
