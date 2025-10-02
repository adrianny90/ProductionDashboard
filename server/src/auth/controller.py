import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Request
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from ..database.core import DbSession
from ..database import entities
import json
from sqlalchemy.orm import Session


load_dotenv(os.path.join(os.path.dirname(__file__), ".." ".env"))


SECRET_KEY = str(os.getenv("SECRET_KEY"))
if SECRET_KEY is None:
    raise ValueError("Lack of SECRET_KEY")
# print("env SECRET KEY:", SECRET_KEY)

ALGORITHM = str(os.getenv("ALGORITHM"))
if ALGORITHM is None:
    raise ValueError("Lack of ALGORITHM")
# print("env ALGORITHM:", ALGORITHM)

ACCESS_TOKEN_EXPIRE_MINUTES = 2

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def get_password_hash(password: str) -> str:
#     return bcrypt_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=300)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# def verify_jwt_token(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong token"
#     )

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         userid: str | None = payload.get("sub")
#         if userid is None:
#             raise credentials_exception
#         return userid
#     except JWTError:
#         raise credentials_exception


def verify_jwt_token(request: Request, db: DbSession):
    token = request.cookies.get("access_token")
    # print("token",token)
    if not token:
        raise HTTPException(status_code=401, detail="Could not get a token")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        userid: str | None = payload.get("sub")
        if userid is None:
            raise HTTPException(status_code=401, detail="invalid token")

        db_user = (
            db.query(entities.Employee).filter(entities.Employee.id == userid).first()
        )
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")

        # print("db_user verify token",db_user)

        data = {
            "user_exists": True,
            "firstName": db_user.firstName,
            "role": db_user.role,
        }

        return data
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
