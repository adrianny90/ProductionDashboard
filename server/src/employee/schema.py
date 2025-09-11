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


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: str | None = None

    def get_uuid(self) -> UUID | None:
        if self.user_id:
            return UUID(self.user_id)
        return None
