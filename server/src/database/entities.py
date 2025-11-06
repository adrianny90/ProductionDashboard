from sqlalchemy import Column, String, Numeric, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
# from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json
from sqlalchemy import MetaData
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass


class Employee(Base):
    __tablename__ = "employees"    

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4))
    email = Column(String, nullable=False, unique=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    password_hash = Column(String)
    role = Column(String, nullable=False, default="user")

    

    def __repr__(self):
        data = {
            "email": self.email,
            "first_name": self.firstName,
            "last_name": self.lastName,
            "id": str(self.id),
            "role": self.role,
        }
        return json.dumps(data)


class LineChart(Base):
    __tablename__ = "line_chart"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    temperature = Column(Numeric(6,2), nullable=False)
    pressure = Column(Numeric(6,2), nullable=False)
    humidity = Column(Numeric(6,2), nullable=False)
    time_stamp = Column(TIMESTAMP, default=datetime.utcnow, index=True, nullable=False)


class BarChart(Base):
    __tablename__ = "bar_chart"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    steel = Column(Numeric(6,2), nullable=False)
    lubricant = Column(Numeric(6,2), nullable=False)
    anti_corrosion_Coating = Column(Numeric(6,2), nullable=False)
    time_stamp = Column(TIMESTAMP, default=datetime.utcnow, index=True, nullable=False)


metadata = MetaData()
