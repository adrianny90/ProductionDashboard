from pydantic import BaseModel
from typing import Optional


class LineChartCreate(BaseModel):
    temperature: float
    humidity: float
    pressure: float

    class Config:
        from_attributes = True


class BarChartCreate(BaseModel):
    steel: float
    lubricant: float
    anti_corrosion_Coating: float

    class Config:
        from_attributes = True
