from fastapi import APIRouter
from uuid import UUID
from . import schema
from ..database.core import DbSession
from . import controller


router_user = APIRouter(prefix="/users", tags=["Employees"])


@router_user.get("/{user_id}", response_model=schema.UserResponse)
async def get_user_by_id(user_id: UUID, db: DbSession):
    return controller.get_user_by_id(db, user_id)


@router_user.post("/", response_model=str)
async def add_user(db: DbSession, user: schema.UserCreate):
    return controller.add_user(db, user)
