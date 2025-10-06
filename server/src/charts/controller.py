from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..database import entities
from uuid import uuid4
from . import schema
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_data_linechart(db: Session):
    data_query = db.query(entities.LineChart).all()
    if not data_query:
        raise HTTPException(status_code=401, detail="Could not find data")
    return data_query


def get_data_linechart_one(db: Session):
    data_query = (
        db.query(entities.LineChart)
        .order_by(entities.LineChart.time_stamp.desc())
        .first()
    )
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
        error_message = f"error while adding data to table line chart: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def post_data_barchart(db: Session, fake_data):
    try:
        data_query = (
            db.query(entities.BarChart)
            .order_by(entities.BarChart.time_stamp.desc())
            .first()
        )
        if not data_query:
            raise HTTPException(status_code=401, detail="Could not find data")
        add_data = entities.BarChart(
            id=uuid4(),
            steel=data_query.steel - fake_data["steel"],
            lubricant=data_query.lubricant - fake_data["lubricant"],
            anti_corrosion_Coating=data_query.anti_corrosion_Coating
            - fake_data["anti_corrosion_Coating"],
        )
        db.add(add_data)
        db.commit()
        db.refresh(add_data)
        return f"Data added successfully"

    except Exception as e:
        error_message = (
            f"Something went wrong while geting bar chart data with error: {str(e)}"
        )
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


def get_data_barchart(db: Session):
    data_query = db.query(entities.BarChart).all()
    if not data_query:
        raise HTTPException(status_code=401, detail="Could not find data")
    return data_query
