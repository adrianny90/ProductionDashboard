from fastapi import APIRouter, Response, Depends, Request
from uuid import UUID
from . import schema
from ..database.core import DbSession
from . import controller
from ..auth.controller import verify_jwt_token
from typing import Dict, Any

router_user = APIRouter(prefix="/users", tags=["Employees"])


@router_user.get("/all")
async def get_all(db: DbSession):
    return controller.get_user_all(db)


@router_user.get("/me", response_model=schema.MeResponse)
async def check_user_me(
    db: DbSession, user: Dict[str, Any] = Depends(verify_jwt_token)
):
    # print("User ID verified:")
    return {
        "user_exists": user["user_exists"],
        "firstName": user["firstName"],
        "role": user["role"],
    }


#  order with dynamic routes makes difference


@router_user.get("/{user_id}", response_model=schema.UserResponse)
async def get_user_by_id(user_id: UUID, db: DbSession):
    return controller.get_user_by_id(db, user_id)


@router_user.post("/signup", response_model=str)
async def add_user(db: DbSession, user: schema.RegisterUserRequest):
    return controller.add_user(db, user)


@router_user.post("/signin", response_model=dict | str)
async def signin_user(db: DbSession, user: schema.CheckUserRequest, response: Response):
    return controller.signin_user(db, user, response)


@router_user.delete("/signout", response_model=dict)
async def logout_user(response: Response):
    return controller.loggingout_user(response)


# @router_user.post("/verify-token/{token}")
# async def verify_token(token: str):
#     return verify_jwt_token(token=token)
