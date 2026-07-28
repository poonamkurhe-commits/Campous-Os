from datetime import datetime
from typing import Optional

from beanie import Document
from pydantic import EmailStr, Field

from app.core.constants import CollegePlan, CollegeStatus
from app.core.deps import utcnow


class College(Document):
    name: str
    subdomain: str
    logo_url: Optional[str] = None
    theme_color: str = "#2563eb"
    plan: CollegePlan = CollegePlan.FREE
    status: CollegeStatus = CollegeStatus.ACTIVE
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)

    class Settings:
        name = "colleges"
        indexes = ["subdomain"]
