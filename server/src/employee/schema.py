from pydantic import BaseModel, EmailStr,ConfigDict
from uuid import UUID


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    firstName: str
    lastName: str
    email: str

    


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
