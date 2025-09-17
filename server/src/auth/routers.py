from fastapi import APIRouter
from . import schema
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from ..database.core import DbSession, get_db
from fastapi import Depends, HTTPException, status



router_auth = APIRouter(prefix="/users/auth", tags=["auth"])

@router_auth.post("/token",response_model=schema.Token)
async def login_for_access_token(form_data:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return ("hi")
