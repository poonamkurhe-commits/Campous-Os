from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.core.constants import UserRole
from app.core.deps import utcnow
from app.core.security import hash_password
from app.models.college import College
from app.models.faculty import Faculty
from app.models.student import Student
from app.models.user import User, UserProfile


async def create_college_with_admin(
    name: str,
    subdomain: str,
    theme_color: str,
    plan: str,
    admin_name: str,
    admin_email: str,
    admin_password: str,
) -> tuple[College, User]:
    existing = await College.find_one(College.subdomain == subdomain.lower())
    if existing:
        raise ValueError("Subdomain already taken")

    existing_user = await User.find_one(User.email == admin_email.lower())
    if existing_user:
        raise ValueError("Admin email already registered")

    college = College(
        name=name,
        subdomain=subdomain.lower(),
        theme_color=theme_color,
        plan=plan,
    )
    await college.insert()

    admin = User(
        college_id=college.id,
        role=UserRole.COLLEGE_ADMIN.value,
        name=admin_name,
        email=admin_email.lower(),
        password_hash=hash_password(admin_password),
        is_verified=True,
    )
    await admin.insert()
    return college, admin


async def register_user(
    name: str,
    email: str,
    password: str,
    role: str,
    college: College,
    roll_no: Optional[str] = None,
    department: Optional[str] = None,
    year: Optional[int] = None,
) -> User:
    existing = await User.find_one(User.email == email.lower())
    if existing:
        raise ValueError("Email already registered")

    user = User(
        college_id=college.id,
        role=role,
        name=name,
        email=email.lower(),
        password_hash=hash_password(password),
        is_verified=True,
    )
    await user.insert()

    if role == UserRole.STUDENT.value:
        if not all([roll_no, department, year]):
            raise ValueError("Student registration requires roll_no, department, and year")
        student = Student(
            college_id=college.id,
            user_id=user.id,
            roll_no=roll_no,
            department=department,
            year=year,
        )
        await student.insert()
    elif role == UserRole.FACULTY.value:
        faculty = Faculty(
            college_id=college.id,
            user_id=user.id,
            department=department or "General",
            subjects=[],
        )
        await faculty.insert()

    return user


async def get_dashboard_stats(college_id, user_id) -> dict:
    from app.models.notification import Notification

    total_students = await Student.find(Student.college_id == college_id).count()
    total_faculty = await Faculty.find(Faculty.college_id == college_id).count()
    notifications = await Notification.find(Notification.college_id == college_id).to_list()
    unread = sum(1 for n in notifications if user_id not in n.read_by)
    return {
        "total_students": total_students,
        "total_faculty": total_faculty,
        "unread_notifications": unread,
        "attendance_rate": None,
    }
