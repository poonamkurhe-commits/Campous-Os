from datetime import datetime, timezone
from typing import Literal, Optional

from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class NotificationTarget(BaseModel):
    scope: Literal["all", "department", "role", "user"] = "all"
    department: Optional[str] = None
    role: Optional[str] = None
    user_id: Optional[PydanticObjectId] = None


class Notification(Document):
    college_id: PydanticObjectId
    target: NotificationTarget = Field(default_factory=NotificationTarget)
    title: str
    body: str
    priority: Literal["low", "normal", "high", "urgent"] = "normal"
    created_by: Optional[PydanticObjectId] = None
    created_at: datetime = Field(default_factory=utcnow)
    read_by: list[PydanticObjectId] = Field(default_factory=list)

    class Settings:
        name = "notifications"
        indexes = ["college_id", "created_at"]
