from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import entities
from uuid import uuid4
from . import schema
import logging
from sqlalchemy import select, desc


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def get_data_linechart(db: AsyncSession):
    try:
        result = await db.execute(select(entities.LineChart))
        data_query = result.scalars().all()
        if not data_query:
            raise HTTPException(status_code=404, detail="Could not find data")
        return data_query
    except Exception as e:
        error_message = f"Error while fetching line chart data with {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def get_data_linechart_one(db: AsyncSession):
    try:
        result = await db.execute(
            select(entities.LineChart).order_by(desc(entities.LineChart.time_stamp))
        )
        data_query = result.scalar_one_or_none()
        if not data_query:
            raise HTTPException(status_code=404, detail="Could not find data")
        return data_query
    except Exception as e:
        error_message = f"Error while fetching line chart data with {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def post_data_linechart(db: AsyncSession, data: schema.LineChartCreate):
    try:
        add_data = entities.LineChart(
            id=uuid4(),
            temperature=data.temperature,
            humidity=data.humidity,
            pressure=data.pressure,
        )
        db.add(add_data)
        await db.commit()
        await db.refresh(add_data)
        return f"Data added successfully"
    except Exception as e:
        error_message = f"error while adding data to table line chart: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def post_data_barchart(db: AsyncSession, fake_data):
    try:
        result = await db.execute(
            select(entities.BarChart).order_by(desc(entities.BarChart.time_stamp))
        )
        data_query = result.scalar_one_or_none()
        if not data_query:
            raise HTTPException(status_code=404, detail="Could not find data")
        add_data = entities.BarChart(
            id=uuid4(),
            steel=data_query.steel - fake_data["steel"],
            lubricant=data_query.lubricant - fake_data["lubricant"],
            anti_corrosion_Coating=data_query.anti_corrosion_Coating
            - fake_data["anti_corrosion_Coating"],
        )
        db.add(add_data)
        await db.commit()
        await db.refresh(add_data)
        return f"Data added successfully"
    except Exception as e:
        error_message = (
            f"Something went wrong while sending bar chart data with error: {str(e)}"
        )
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)


async def get_data_barchart(db: AsyncSession):
    try:
        result = await db.execute(select(entities.BarChart))
        data_query = result.scalars().all()
        if not data_query:
            raise HTTPException(status_code=404, detail="Could not find data")
        return data_query
    except Exception as e:
        error_message = (
            f"Something went wrong while fetching bar chart data with error: {str(e)}"
        )
        logger.error(error_message)
        raise HTTPException(status_code=500, detail=error_message)
