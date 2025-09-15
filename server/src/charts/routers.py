from fastapi import APIRouter
from ..database.core import DbSession
from . import controller
from . import schema
import random
import asyncio
from ..database import entities
from fastapi import HTTPException


router_charts = APIRouter(prefix="/charts", tags=["Charts-data"])


@router_charts.get("/line")
async def get_data_line(db: DbSession):
    return controller.get_data_linechart(db)


@router_charts.post("/line")
async def add_data_line(db: DbSession, data: schema.LineChartCreate):
    # Random creation data for charts
    for _ in range(1, 125):
        fake_data = {
            "temperature": round(random.uniform(40.0, 100.0), 2),
            "humidity": round(random.uniform(30.0, 90.0), 2),
            "pressure": round(random.uniform(2.0, 7.0), 2),
        }

        try:
            db_line_chart = entities.LineChart(
                temperature=fake_data["temperature"],
                humidity=fake_data["humidity"],
                pressure=fake_data["pressure"],
            )
            print(f"Created {_} rekord")
            controller.post_data_linechart(db, db_line_chart)
            await asyncio.sleep(10)

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Something wrong in loop wit error {str(e)}"
            )
    return f"Data added successfully"
    # return controller.post_data_linechart(db, data)
