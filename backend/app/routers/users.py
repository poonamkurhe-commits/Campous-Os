from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.constants import UserRole
from app.core.deps import get_tenant_college, get_tenant_scoped_user, require_roles
from app.models.college import College
from app.models.faculty import Faculty
from app.models.student import Student
from app.models.user import User
from app.schemas.profile import DashboardStats, FacultyProfileResponse, StudentProfileResponse
from app.services.users import get_dashboard_stats

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/dashboard/stats", response_model=DashboardStats)
async def dashboard_stats(
    user: Annotated[User, Depends(get_tenant_scoped_user)],
    college: Annotated[College, Depends(get_tenant_college)],
):
    stats = await get_dashboard_stats(college.id, user.id)
    return DashboardStats(**stats)


@router.get("/students", response_model=List[StudentProfileResponse])
async def list_students(
    _: Annotated[User, Depends(require_roles(UserRole.COLLEGE_ADMIN, UserRole.FACULTY))],
    college: Annotated[College, Depends(get_tenant_college)],
):
    students = await Student.find(Student.college_id == college.id).to_list()
    result = []
    for s in students:
        u = await User.get(s.user_id)
        if u:
            result.append(
                StudentProfileResponse(
                    id=str(s.id),
                    user_id=str(u.id),
                    name=u.name,
                    email=u.email,
                    roll_no=s.roll_no,
                    department=s.department,
                    year=s.year,
                    semester=s.semester,
                    avatar_url=u.profile.avatar_url,
                    emergency_contact=s.emergency_contact,
                    blood_group=s.blood_group,
                )
            )
    return result


@router.get("/faculty", response_model=List[FacultyProfileResponse])
async def list_faculty(
    _: Annotated[User, Depends(require_roles(UserRole.COLLEGE_ADMIN))],
    college: Annotated[College, Depends(get_tenant_college)],
):
    faculty_list = await Faculty.find(Faculty.college_id == college.id).to_list()
    result = []
    for f in faculty_list:
        u = await User.get(f.user_id)
        if u:
            result.append(
                FacultyProfileResponse(
                    id=str(f.id),
                    user_id=str(u.id),
                    name=u.name,
                    email=u.email,
                    department=f.department,
                    subjects=f.subjects,
                    avatar_url=u.profile.avatar_url,
                )
            )
    return result


@router.get("/me/profile")
async def my_profile(
    user: Annotated[User, Depends(get_tenant_scoped_user)],
    college: Annotated[College, Depends(get_tenant_college)],
):
    if user.role == UserRole.STUDENT.value:
        student = await Student.find_one(Student.user_id == user.id, Student.college_id == college.id)
        if not student:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student profile not found")
        return StudentProfileResponse(
            id=str(student.id),
            user_id=str(user.id),
            name=user.name,
            email=user.email,
            roll_no=student.roll_no,
            department=student.department,
            year=student.year,
            semester=student.semester,
            avatar_url=user.profile.avatar_url,
            emergency_contact=student.emergency_contact,
            blood_group=student.blood_group,
        )
    if user.role == UserRole.FACULTY.value:
        faculty = await Faculty.find_one(Faculty.user_id == user.id, Faculty.college_id == college.id)
        if not faculty:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Faculty profile not found")
        return FacultyProfileResponse(
            id=str(faculty.id),
            user_id=str(user.id),
            name=user.name,
            email=user.email,
            department=faculty.department,
            subjects=faculty.subjects,
            avatar_url=user.profile.avatar_url,
        )
    return {"id": str(user.id), "name": user.name, "email": user.email, "role": user.role}
