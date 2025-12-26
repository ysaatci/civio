from unittest import skip
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.session import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy import text
from db.models.listing import Listing
from schemas.listing import ListingCreate, ListingResponse

app = FastAPI(
    title="Civio API",
    description="Placeholder for the Civio API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/listings", response_model = ListingResponse, status_code=201)
def create_listing(
    listing: ListingCreate,
    db: Session = Depends(get_db)
):
    db_listing = Listing(**listing.model_dump())
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

    
@app.get(f"/listings", response_model = list[ListingResponse], status_code = 201)
def get_listings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    listings = db.query(Listing).offset(skip).limit(limit).all()
    return listings


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": "disconnected", "error": str(e)}

@app.get("/version")
async def version():
    return {"version": "0.1.0"}

@app.get("/ping")
async def ping():
    return {"message": "pong"}
