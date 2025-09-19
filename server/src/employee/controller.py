from uuid import UUID, uuid4
from sqlalchemy.orm import Session
from ..database import entities
from fastapi import HTTPException, Response, Request
from . import schema
from passlib.context import CryptContext
import logging
from datetime import timedelta
from ..auth.controller import create_access_token
from dotenv import load_dotenv
import os
from fastapi.security import OAuth2PasswordBearer


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


def get_user_all(db: Session):
    db_users = db.query(entities.Employee).all()
    if not db_users:
        raise HTTPException(status_code=401, detail="Could not find a user")
    return db_users


def get_user_by_id(db: Session, user_id: UUID):
    db_user = (
        db.query(entities.Employee).filter(entities.Employee.id == user_id).first()
    )
    if not db_user:
        raise HTTPException(status_code=401, detail="Could not find a user")
    return db_user


def add_user(db: Session, user: schema.RegisterUserRequest) -> str:
    try:
        db_user = (
            db.query(entities.Employee)
            .filter(entities.Employee.email == user.email)
            .first()
        )
        print(db_user)
        if db_user:
            error_message = f"User with such email already exists"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)
        create_user = entities.Employee(
            id=uuid4(),
            email=user.email,
            firstName=user.firstName,
            lastName=user.lastName,
            password_hash=get_password_hash(user.password),
        )
        db.add(create_user)
        db.commit()
        db.refresh(create_user)
        return f"User with email {create_user.email} is created"
    except Exception as e:
        error_message = f"error while creating an user with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def signin_user(db: Session, user: schema.CheckUserRequest, response: Response) -> dict:
    try:
        db_user = (
            db.query(entities.Employee)
            .filter(entities.Employee.email == user.email)
            .first()
        )
        # print("user!!", db_user)
        if not db_user:
            error_message = f"User with such email doesn't exist"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)
        if db_user.password_hash is None:
            error_message = "User password hash is missing"
            logger.error(error_message)
            raise HTTPException(status_code=500, detail=error_message)

        password_hash = str(db_user.password_hash)
        if not bcrypt_context.verify(user.password, password_hash):
            error_message = f"Wrong credentials"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)

        is_production = PYTHON_ENV == "production"
        # access_token_expires = timedelta(minutes=2)
        access_token = create_access_token(data={"sub": str(db_user.id)})
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=is_production,
            secure=True,
            # samesite="lax" if is_production else "none",
            samesite="none",
            max_age=180,
        )
        # return {"access_token": access_token, "token_type": "bearer"}
        return {"message": "Login successful", "user_id": db_user.id}
    except Exception as e:
        error_message = f"error while signing in with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def loggingout_user(response: Response) -> dict:

    response.delete_cookie(
        key="access_token",
        httponly=is_production,
        secure=True,
        # samesite="lax" if is_production else "none",
        samesite="none",
    )
    return {"message": "Logout successfuly"}
