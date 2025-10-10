from uuid import UUID, uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import entities
from fastapi import HTTPException, Response
from . import schema
from passlib.context import CryptContext
import logging
from ..auth.controller import create_access_token
from dotenv import load_dotenv
import os
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import update, select


load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
PYTHON_ENV = os.getenv("PYTHON_ENV")
if PYTHON_ENV is None:
    raise ValueError("Lack of PYTHON_ENV")
is_production = PYTHON_ENV == "production"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)


async def get_user_all(db: AsyncSession):
    try:
        result = await db.execute(select(entities.Employee))
        db_users = result.scalars().all()
        if not db_users:
            raise HTTPException(status_code=401, detail="Could not find a user")
        return db_users
    except Exception as e:
        error_message = f"Error while fetching users with error: {str(e)}"
        raise HTTPException(status_code=500, detail=error_message)


async def get_user_by_id(db: AsyncSession, user_id: str):
    try:
        result = await db.execute(
            select(entities.Employee).filter(entities.Employee.id == user_id)
        )
        db_user = result.scalar_one_or_none()
        if not db_user:
            raise HTTPException(status_code=404, detail="Could not find a user")
        return db_user
    except Exception as e:
        error_message = f"Error while fetching an user with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def add_user(db: AsyncSession, user: schema.RegisterUserRequest) -> str:
    try:
        result = await db.execute(
            select(entities.Employee).filter(entities.Employee.email == user.email)
        )
        db_user = result.scalar_one_or_none()
        print(db_user)
        if db_user:
            error_message = f"User with such email already exists"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)
        create_user = entities.Employee(
            id=str(uuid4()),
            email=user.email,
            firstName=user.firstName,
            lastName=user.lastName,
            password_hash=get_password_hash(user.password),
        )
        db.add(create_user)
        await db.commit()
        await db.refresh(create_user)
        return f"User with email {create_user.email} is created"
    except Exception as e:
        error_message = f"Error while creating an user with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def signin_user(
    db: AsyncSession, user: schema.CheckUserRequest, response: Response
) -> dict:
    try:
        result = await db.execute(
            select(entities.Employee).filter(entities.Employee.email == user.email)
        )
        db_user = result.scalar_one_or_none()
        if not db_user:
            error_message = f"User with such email doesn't exist"
            logger.error(error_message)
            raise HTTPException(status_code=404, detail=error_message)
        if db_user.password_hash is None:
            error_message = "User password hash is missing"
            logger.error(error_message)
            raise HTTPException(status_code=500, detail=error_message)
        password_hash = str(db_user.password_hash)
        if not bcrypt_context.verify(user.password, password_hash):
            error_message = f"Wrong credentials"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)
        access_token = create_access_token(data={"sub": str(db_user.id)})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=is_production,
            secure=True,
            # samesite="lax" if is_production else "none",
            samesite="none",
            max_age=30000,
        )
        return {
            "message": "Login successful",
            "userName": db_user.firstName,
            "userRole": db_user.role,
            "user_exists": True,
            "user_id": db_user.id,
        }
    except Exception as e:
        error_message = f"error while signing in with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def logout_user(response: Response) -> dict:

    response.delete_cookie(
        key="access_token",
        httponly=is_production,
        secure=True,
        # samesite="lax" if is_production else "none",
        samesite="none",
    )
    return {"message": "Logout successfully"}


async def editing_user_by_id(
    db: AsyncSession, user_id: str, user: schema.UpdateUserRequest
):
    print(user_id)
    if str(user_id) != user.id:
        raise HTTPException(status_code=400, detail="ID in payload does not match URL")
    result = await db.execute(
        update(entities.Employee)
        .where(entities.Employee.id == user_id)
        .values(
            email=user.email,
            firstName=user.firstName,
            lastName=user.lastName,
        )
    )
    await db.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Could not find a user")
    find_user = await db.execute(
        select(entities.Employee).filter(entities.Employee.id == user_id)
    )
    db_user = find_user.scalar_one_or_none()
    if not db_user:
        raise HTTPException(status_code=500, detail="User not found in database")
    return db_user
