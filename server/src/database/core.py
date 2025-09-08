from sqlalchemy import create_engine,MetaData
import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from typing import Annotated
from fastapi import Depends
from .entities import Base

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

DATABASE_URL= os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("Lack of DATABASE_URL")
print(DATABASE_URL)
#  for sqlite test
# DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autoflush=False, bind=engine, autocommit=False)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
metadata = MetaData()

Base.metadata.create_all(bind=engine)

DbSession = Annotated[Session, Depends(get_db)]