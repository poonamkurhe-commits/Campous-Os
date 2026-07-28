from typing import Optional

from pydantic import BaseModel, EmailStr


class StudentProfileResponse(BaseModel):
    id: str
    user_id: str
    name: str
    email: EmailStr
    roll_no: str
    department: str
    year: int
    semester: int
    avatar_url: Optional[str] = None
    emergency_contact: Optional[str] = None
    blood_group: Optional[str] = None


class FacultyProfileResponse(BaseModel):
    id: str
    user_id: str
    name: str
    email: EmailStr
    department: str
    subjects: list[str]
    avatar_url: Optional[str] = None


class DashboardStats(BaseModel):
    total_students: int = 0
    total_faculty: int = 0
    unread_notifications: int = 0
    attendance_rate: Optional[float] = None
