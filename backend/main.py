from unittest import skip
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.session import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from sqlalchemy import text
from db.models import Listing
from schemas import ListingCreate, ListingResponse
from api.v1.api import api_router


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

app.include_router(api_router, prefix="/api/v1")


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