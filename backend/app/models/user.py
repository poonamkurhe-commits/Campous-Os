from datetime import datetime
from typing import Optional

from beanie import Document, Link, PydanticObjectId
from pydantic import BaseModel, EmailStr, Field

from app.core.deps import utcnow


class UserProfile(BaseModel):
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    emergency_contact: Optional[str] = None
    blood_group: Optional[str] = None


class User(Document):
    college_id: Optional[PydanticObjectId] = None
    role: str
    name: str
    email: EmailStr
    password_hash: str
    profile: UserProfile = Field(default_factory=UserProfile)
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)

    class Settings:
        name = "users"
        indexes = ["email", "college_id", "role"]
