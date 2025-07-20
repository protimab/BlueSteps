from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app import models, db, auth, schemas
from app.db import get_db

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to Blue Steps API!"}

@app.get("/habits/checkins/")
def get_checkins(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    # get all habits for user
    habits = db.query(models.Habit).filter(models.Habit.owner_id == current_user.id).all()
    habit_ids = [habit.id for habit in habits]

    # get all check-ins for these habits
    checkins = db.query(models.HabitCheckIn).filter(models.HabitCheckIn.habit_id.in_(habit_ids)).all()

    # serialize: return list of dicts with habit_id and date
    return [
        {"habit_id": c.habit_id, "date": c.date.isoformat(), "description": next(h.description for h in habits if h.id == c.habit_id)}
        for c in checkins
    ]
