from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserResponse(BaseModel):
    id: UUID
    firstName: str
    lastName: str
    email: str

    class Config:
        from_attribites = True


class UserCreate(UserResponse):
    password: str
    confirmPassword: str


class RegisterUserRequest(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    password: str


class UpdateUserRequest(BaseModel):
    email: str
    firstName: str
    lastName: str
    id: str
    role: str


class CheckUserRequest(BaseModel):
    email: EmailStr
    password: str


class MeResponse(BaseModel):
    user_exists: bool
    firstName: str
    role: str
