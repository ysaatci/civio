from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy import text

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
