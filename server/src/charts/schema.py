from pydantic import BaseModel
from typing import Optional


class LineChartCreate(BaseModel):
    temperature: float
    humidity: float
    pressure: float

    class Config:
        orm_mode = True
