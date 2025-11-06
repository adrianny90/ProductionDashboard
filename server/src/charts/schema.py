from pydantic import BaseModel, ConfigDict, Field
from decimal import Decimal


class LineChartCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    temperature: Decimal=Field(max_digits=6, decimal_places=2)
    humidity: Decimal=Field(max_digits=6, decimal_places=2)
    pressure: Decimal=Field(max_digits=6, decimal_places=2)


class BarChartCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    steel: Decimal=Field(max_digits=6, decimal_places=2)
    lubricant: Decimal=Field(max_digits=6, decimal_places=2)
    anti_corrosion_Coating: Decimal=Field(max_digits=6, decimal_places=2)
