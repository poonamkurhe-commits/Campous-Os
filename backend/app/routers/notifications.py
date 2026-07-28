from typing import Annotated, List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from app.core.constants import UserRole
from app.core.deps import get_tenant_college, get_tenant_scoped_user, require_roles
from app.models.college import College
from app.models.notification import Notification, NotificationTarget
from app.models.user import User
from app.schemas.notification import NotificationCreate, NotificationResponse

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=List[NotificationResponse])
async def list_notifications(
    user: Annotated[User, Depends(get_tenant_scoped_user)],
    college: Annotated[College, Depends(get_tenant_college)],
):
    notifications = (
        await Notification.find(Notification.college_id == college.id)
        .sort(-Notification.created_at)
        .limit(50)
        .to_list()
    )
    return [
        NotificationResponse(
            id=str(n.id),
            title=n.title,
            body=n.body,
            priority=n.priority,
            created_at=n.created_at,
            is_read=user.id in n.read_by,
        )
        for n in notifications
    ]


@router.post("", response_model=NotificationResponse, status_code=201)
async def create_notification(
    body: NotificationCreate,
    user: Annotated[User, Depends(require_roles(UserRole.COLLEGE_ADMIN, UserRole.FACULTY))],
    college: Annotated[College, Depends(get_tenant_college)],
):
    notification = Notification(
        college_id=college.id,
        target=NotificationTarget(
            scope=body.target_scope,
            department=body.department,
            role=body.role,
        ),
        title=body.title,
        body=body.body,
        priority=body.priority,
        created_by=user.id,
    )
    await notification.insert()
    return NotificationResponse(
        id=str(notification.id),
        title=notification.title,
        body=notification.body,
        priority=notification.priority,
        created_at=notification.created_at,
        is_read=False,
    )


@router.post("/{notification_id}/read")
async def mark_read(
    notification_id: str,
    user: Annotated[User, Depends(get_tenant_scoped_user)],
    college: Annotated[College, Depends(get_tenant_college)],
):
    notification = await Notification.get(PydanticObjectId(notification_id))
    if not notification or notification.college_id != college.id:
        return {"ok": False}
    if user.id not in notification.read_by:
        notification.read_by.append(user.id)
        await notification.save()
    return {"ok": True}
