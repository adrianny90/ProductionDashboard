from sqlalchemy import Column, String, Float, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime


Base = declarative_base()


class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    password_hash = Column(String)

    def __repr__(self):
        return f"<User(email={self.email}, first_name={self.firstName}, last_name={self.lastName})>"


class LineChart(Base):
    __tablename__ = "line_chart"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    temperature = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)
    huminidity = Column(Float, nullable=False)
    time_stamp = Column(TIMESTAMP, default=datetime.utcnow, index=True, nullable=False)
