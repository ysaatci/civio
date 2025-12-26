from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ListingBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: int
    currency: str = "TRY"
    city: str
    district: str
    rooms: int
    bathrooms: Optional[int] = None
    area: Optional[int] = None
    is_for_sale: bool = True


class ListingCreate(ListingBase):
    pass


class ListingUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    price: Optional[int]
    rooms: Optional[int]
    bathrooms: Optional[int]
    area: Optional[int]
    is_for_sale: Optional[bool]

class ListingResponse(ListingBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True