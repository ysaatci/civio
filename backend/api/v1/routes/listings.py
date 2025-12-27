from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import Listing
from schemas import ListingCreate, ListingResponse
from typing import List, Optional


router = APIRouter()

@router.post("/", response_model = ListingResponse, status_code=201)
def create_listing(
    listing: ListingCreate,
    db: Session = Depends(get_db)
):
    db_listing = Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

    
@router.get("/", response_model = list[ListingResponse], status_code = 200)
def get_listings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    listings = db.query(Listing).offset(skip).limit(limit).all()
    return listings


