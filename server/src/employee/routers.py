from fastapi import APIRouter
from uuid import UUID
from . import schema
from ..database.core import DbSession
from . import controller
from ..auth.controller import verify_jwt_token


router_user = APIRouter(prefix="/users", tags=["Employees"])


@router_user.get("/all")
async def get_all(db: DbSession):
    return controller.get_user_all(db)


@router_user.get("/{user_id}", response_model=schema.UserResponse)
async def get_user_by_id(user_id: UUID, db: DbSession):
    return controller.get_user_by_id(db, user_id)


@router_user.post("/signup", response_model=str)
async def add_user(db: DbSession, user: schema.RegisterUserRequest):
    return controller.add_user(db, user)


@router_user.post("/signin", response_model=dict)
async def signin_user(db: DbSession, user: schema.CheckUserRequest):
    return controller.signin_user(db, user)


@router_user.post("/verify-token/{token}")
async def verify_token(token: str):
    return verify_jwt_token(token=token)
