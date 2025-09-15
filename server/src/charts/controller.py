from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..database import entities
from uuid import UUID, uuid4
from . import schema
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_data_linechart(db: Session):
    data_query = db.query(entities.LineChart).all()
    if not data_query:
        raise HTTPException(status_code=401, detail="Could not find data")
    return data_query


def post_data_linechart(db: Session, data: schema.LineChartCreate):
    try:
        add_data = entities.LineChart(
            id=uuid4(),
            temperature=data.temperature,
            humidity=data.humidity,
            pressure=data.pressure,
        )
        db.add(add_data)
        db.commit()
        db.refresh(add_data)
        return f"Data added successfully"
    except Exception as e:
        error_message = f"error while adding data to table: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)
