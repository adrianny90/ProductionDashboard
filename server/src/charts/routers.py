from fastapi import APIRouter
from ..database.core import DbSession
from . import controller


router_charts = APIRouter(prefix="/charts", tags=["Charts-data"])


@router_charts.get("/line")
async def get_data_line(db: DbSession):
    return controller.get_data_linechart(db)
