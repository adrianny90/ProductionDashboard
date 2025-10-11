from pydantic import BaseModel, ConfigDict
from typing import Optional


class LineChartCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    temperature: float
    humidity: float
    pressure: float


class BarChartCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    steel: float
    lubricant: float
    anti_corrosion_Coating: float
