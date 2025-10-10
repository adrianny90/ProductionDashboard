from fastapi import APIRouter, Depends, HTTPException
from ..database.core import DbSession
from . import controller
from . import schema
import random
import asyncio
from ..database import entities
from ..auth.controller import verify_jwt_token


router_charts = APIRouter(prefix="/charts", tags=["Charts-data"])


@router_charts.get("/line", dependencies=[Depends(verify_jwt_token)])
async def get_data_line(db: DbSession):
    result = await controller.get_data_linechart(db)
    return result


@router_charts.get("/line/one")
async def get_data_line_one(db: DbSession):
    return controller.get_data_linechart_one(db)


@router_charts.post("/line")
async def add_data_line(db: DbSession, data: schema.LineChartCreate):
    # Random creation data for charts
    for _ in range(1, 125):
        fake_data = {
            "temperature": round(random.uniform(40.0, 65.0), 2),
            "humidity": round(random.uniform(55.0, 85.0), 2),
            "pressure": round(random.uniform(12.0, 18.0), 2),
        }

        try:
            db_line_chart = entities.LineChart(
                temperature=fake_data["temperature"],
                humidity=fake_data["humidity"],
                pressure=fake_data["pressure"],
            )
            print(f"Created {_} rekord line")
            await controller.post_data_linechart(db, db_line_chart)
            await asyncio.sleep(10)

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Something wrong in loop wit error {str(e)}"
            )
    return f"Data added successfully"


@router_charts.get("/bar", dependencies=[Depends(verify_jwt_token)])
async def get_data_bar(db: DbSession):
    result = await controller.get_data_barchart(db)
    return result


@router_charts.post("/bar")
async def add_data_bar(db: DbSession, data: schema.BarChartCreate):
    # Random creation data for charts
    for _ in range(1, 125):
        fake_data = {
            "steel": round(random.uniform(30.0, 10.0), 2),
            "lubricant": round(random.uniform(3.0, 5.0), 2),
            "anti_corrosion_Coating": round(random.uniform(2.0, 7.0), 2),
        }
        print(fake_data)

        try:

            await controller.post_data_barchart(db, fake_data)
            print(f"Adding {_} time bar")
            await asyncio.sleep(10)

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Something wrong in loop with error {str(e)}"
            )
    return f"Data added successfully"


# fake data to serve to frontend
bar_data = [
    {"name": "CO2 Emissions (t)", "value": 10},
    {"name": "Energy Consumption (MWh)", "value": 14},
    {"name": "Solid Waste (t)", "value": 16},
    {"name": "Renewable Energy Usage (%)", "value": 21},
    {"name": "Water Recycling (m³)", "value": 39},
]


@router_charts.get("/pie", dependencies=[Depends(verify_jwt_token)])
async def get_data_pie():
    return bar_data


@router_charts.get("/mixBar", dependencies=[Depends(verify_jwt_token)])
async def get_data_mix_bar(db: DbSession):
    result = await controller.get_data_barchart(db)
    return result
