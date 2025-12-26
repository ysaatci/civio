from app.database import engine, SessionLocal
from sqlalchemy import text

def test_connection():
    try:
        with SessionLocal() as db:
            result = db.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"Connected to PostgreSQL!")
            print(f"Version: {version}")
            return True
    except Exception as e:
        print(f"Connection failed! {e}")
        return False

if __name__ == "__main__":
    test_connection()