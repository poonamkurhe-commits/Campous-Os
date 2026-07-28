from datetime import datetime
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field

from app.core.deps import utcnow


class Student(Document):
    college_id: PydanticObjectId
    user_id: PydanticObjectId
    roll_no: str
    department: str
    year: int
    semester: int = 1
    emergency_contact: Optional[str] = None
    blood_group: Optional[str] = None
    created_at: datetime = Field(default_factory=utcnow)

    class Settings:
        name = "students"
        indexes = ["college_id", "user_id", "roll_no"]
