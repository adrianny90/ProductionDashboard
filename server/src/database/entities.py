from sqlalchemy import Column, String, Float, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json

Base = declarative_base()


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
    temperature = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    time_stamp = Column(TIMESTAMP, default=datetime.utcnow, index=True, nullable=False)


class BarChart(Base):
    __tablename__ = "bar_chart"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    steel = Column(Float, nullable=False)
    lubricant = Column(Float, nullable=False)
    anti_corrosion_Coating = Column(Float, nullable=False)
    time_stamp = Column(TIMESTAMP, default=datetime.utcnow, index=True, nullable=False)
