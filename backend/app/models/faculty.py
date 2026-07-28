from datetime import datetime
from typing import List, Optional

from beanie import Document, PydanticObjectId
from pydantic import Field

from app.core.deps import utcnow


class Faculty(Document):
    college_id: PydanticObjectId
    user_id: PydanticObjectId
    department: str
    subjects: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=utcnow)

    class Settings:
        name = "faculty"
        indexes = ["college_id", "user_id"]
