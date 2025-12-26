from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey,
    Numeric
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.base import Base

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    price = Column(Integer, nullable=False)
    currency = Column(String(3), default="TRY")

    city = Column(String(100), index=True)
    district = Column(String(100), index=True)

    rooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=True)
    area = Column(Integer, nullable=True)

    is_for_sale = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


