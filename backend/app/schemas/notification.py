from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class NotificationCreate(BaseModel):
    title: str
    body: str
    priority: Literal["low", "normal", "high", "urgent"] = "normal"
    target_scope: Literal["all", "department", "role"] = "all"
    department: Optional[str] = None
    role: Optional[str] = None


class NotificationResponse(BaseModel):
    id: str
    title: str
    body: str
    priority: str
    created_at: datetime
    is_read: bool = False
