from uuid import UUID, uuid4
from sqlalchemy.orm import Session
from ..database import entities
from fastapi import HTTPException
from . import schema
from passlib.context import CryptContext
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


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


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)






def signin_user(db: Session, user: schema.CheckUserRequest) -> str:
    try:
        db_user = (
            db.query(entities.Employee)
            .filter(entities.Employee.email == user.email)
            .first()
        )
        print("user!!",db_user)
        if not db_user:
            error_message = f"User with such email doesn't exist"
            logger.error(error_message)
            raise HTTPException(status_code=401, detail=error_message)
      
        return ("fine")
    except Exception as e:
        error_message = f"error while signing in with error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)