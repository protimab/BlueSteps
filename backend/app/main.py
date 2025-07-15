from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

from app import models, db, auth, schemas
from app.db import get_db
from datetime import date

app = FastAPI()

# create all tables 
models.Base.metadata.create_all(bind=db.engine)

# login and access token
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

#for user sign up
@app.post("/users/signup", status_code=status.HTTP_201_CREATED)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email}

# for creating the users habits
@app.post("/habits/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    new_habit = models.Habit(description=habit.description, owner_id=current_user.id)
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

# read current user habits
@app.get("/habits/", response_model=List[schemas.Habit])
def read_habits(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    habits = db.query(models.Habit).filter(models.Habit.owner_id == current_user.id).all()
    return habits

#update habit
@app.put("/habits/{habit_id}", response_model=schemas.Habit)
def update_habit(habit_id: int, habit_update: schemas.HabitCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id, models.Habit.owner_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    habit.description = habit_update.description
    db.commit()
    db.refresh(habit)
    return habit

#delete habit
@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id, models.Habit.owner_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    db.delete(habit)
    db.commit()
    return {"message": "Habit deleted"}

#habit check in
@app.post("/habits/{habit_id}/checkin")
def checkin_habit(habit_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    habit = db.query(models.Habit).filter_by(id=habit_id, owner_id=current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    checkin = models.HabitCheckIn(habit_id=habit.id, date=date.today())
    db.add(checkin)
    db.commit()
    db.refresh(checkin)
    return {"message": "Check-in recorded", "date": checkin.date}
