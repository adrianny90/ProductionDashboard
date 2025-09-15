from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..database import entities


def get_data_linechart(db: Session):
    data_query = db.query(entities.LineChart).all()
    if not data_query:
        raise HTTPException(status_code=401, detail="Could not find data")
    return data_query
