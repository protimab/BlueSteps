from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app import models, db, auth
from app.db import get_db

app = FastAPI()

# for login and access token
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# for creating a user
@app.post("/users/")
def create_user(email: str, password: str, db: Session = Depends(get_db)):
    hashed_password = auth.get_password_hash(password)
    user = models.User(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"email": user.email, "id": user.id}

# for creating the users habits
@app.post("/habits/")
def create_habit(description: str, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    habit = models.Habit(description=description, owner_id=current_user.id)
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

@app.get("/habits/")
def read_habits(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Habit).filter(models.Habit.owner_id == current_user.id).all()
