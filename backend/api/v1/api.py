from api.v1.routes import listings
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(listings.router, prefix="/listings", tags=["Listings"])