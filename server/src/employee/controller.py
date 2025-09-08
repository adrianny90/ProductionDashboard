from uuid import UUID, uuid4
from sqlalchemy.orm import Session
from ..database import entities
from fastapi import HTTPException
from . import schema
from passlib.context import CryptContext
import jwt


def get_user_by_id(db:Session, user_id:UUID):
    db_user = db.query(entities.Employee).filter(entities.Employee.id==user_id).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Could not find a user")
    return db_user


def add_user(db:Session, user:schema.UserCreate) -> str:
    try:
        db_user = db.query(entities.Employee).filter(entities.Employee.email==user.email).first()
        if db_user:
            raise HTTPException(status_code=401, detail="User with such email already exists")
        create_user = entities.Employee(id=uuid4(), email=user.email, first_name=user.first_name, last_name=user.last_name, password_hash=get_password_hash(user.password))
        db.add(create_user)
        db.commit()
        db.refresh(create_user)
        return f"User with email {create_user.email} is created"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"error while creating an user with error: {str(e)}")


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_password_hash(password: str) -> str:
    return bcrypt_context.hash(password)