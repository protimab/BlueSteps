from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List
import json
from datetime import date, datetime, timedelta

from app import models, db, auth, schemas
from app.db import get_db
from app.schemas import HabitCheckInCreate 
from app.ocean_data import fetch_marine_data
from app.models import ActivityType

app = FastAPI()

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# create all tables 
models.Base.metadata.create_all(bind=db.engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to Blue Steps API!"}

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
    try:
        existing_user = db.query(models.User).filter(models.User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = auth.get_password_hash(user.password)
        new_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"id": new_user.id, "email": new_user.email, "name": new_user.name}
    except Exception as e:
        print("Signup error:", e)
        raise

# for creating the users habits
@app.post("/habits/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    try:
        print(f"Creating habit with description: {habit.description}")
        new_habit = models.Habit(description=habit.description, owner_id=current_user.id)
        db.add(new_habit)
        db.commit()
        db.refresh(new_habit)
        print(f"Successfully created habit with ID: {new_habit.id}")
        return new_habit
    except Exception as e:
        print(f"Error creating habit: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create habit")

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
def checkin_habit(
   habit_id: int, 
    checkin_data: HabitCheckInCreate = Body(...),
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)):
    
    print(f"Checking in habit {habit_id} with location: {checkin_data.latitude}, {checkin_data.longitude}")
    
    habit = db.query(models.Habit).filter_by(id=habit_id, owner_id=current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    checkin = models.HabitCheckIn(
        habit_id=habit.id, 
        date=date.today(),
        latitude=checkin_data.latitude,
        longitude=checkin_data.longitude,
    )
    db.add(checkin)
    db.commit()
    db.refresh(checkin)

    marine_data = fetch_marine_data(lat=checkin.latitude, lon=checkin.longitude) 

    return {
        "message": "Check-in recorded",
        "date": checkin.date,
        "marine_data": marine_data,
        "latitude": checkin.latitude,
        "longitude": checkin.longitude,
        "marine_data": marine_data,
    }

#get habit check ins
@app.get("/habits/checkins/", response_model=List[schemas.HabitCheckIn])
def get_all_checkins(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    habits = db.query(models.Habit).filter(models.Habit.owner_id == current_user.id).all()
    checkins = []
    for habit in habits:
        for checkin in habit.checkins:
            checkin.habit_description = habit.description
            checkins.append(checkin)
    
    return checkins

#get ocean data
@app.get("/ocean-data/")
def get_ocean_data():
    return fetch_marine_data()

#get community stats
@app.get("/community/stats")
def get_community_stats(db: Session = Depends(get_db)):
    
    # total user
    total_users = db.query(models.User).count()
    
    # total check ins
    total_checkins = db.query(models.HabitCheckIn).count()
    
    # total score
    total_impact = db.query(func.sum(models.HabitCheckIn.impact_score)).scalar() or 0
    
    # activity break down
    activity_stats = db.query(
        models.Habit.activity_type,
        func.count(models.HabitCheckIn.id).label('count')
    ).join(models.HabitCheckIn).group_by(models.Habit.activity_type).all()
    
    activity_breakdown = {
        activity.value: count for activity, count in activity_stats
    }
    
    # week activity
    week_ago = date.today() - timedelta(days=7)
    recent_checkins = db.query(models.HabitCheckIn).filter(
        models.HabitCheckIn.date >= week_ago
    ).count()
    
    # top contributors this month
    month_ago = date.today() - timedelta(days=30)
    top_contributors = db.query(
        models.User.name,
        func.sum(models.HabitCheckIn.impact_score).label('monthly_score')
    ).join(models.Habit).join(models.HabitCheckIn).filter(
        models.HabitCheckIn.date >= month_ago
    ).group_by(models.User.id, models.User.name).order_by(
        desc('monthly_score')
    ).limit(5).all()
    
    return {
        "total_users": total_users,
        "total_checkins": total_checkins,
        "total_impact_score": round(total_impact, 1),
        "activity_breakdown": activity_breakdown,
        "recent_weekly_checkins": recent_checkins,
        "top_contributors": [
            {"name": name, "impact_score": float(score)} 
            for name, score in top_contributors
        ]
    }

#recent check ins
@app.get("/community/recent-activity")
def get_recent_community_activity(limit: int = 20, db: Session = Depends(get_db)):

    recent_checkins = db.query(models.HabitCheckIn).join(
        models.Habit
    ).join(models.User).order_by(
        desc(models.HabitCheckIn.date)
    ).limit(limit).all()
    
    activity_feed = []
    for checkin in recent_checkins:
        activity_feed.append({
            "id": checkin.id,
            "user_name": checkin.habit.owner.name,
            "activity_type": checkin.habit.activity_type.value,
            "description": checkin.habit.description,
            "date": checkin.date,
            "impact_score": checkin.impact_score,
            "location": {
                "latitude": checkin.latitude,
                "longitude": checkin.longitude
            } if checkin.latitude and checkin.longitude else None
        })
    
    return activity_feed

#get all check ins globally
@app.get("/community/global-map")
def get_global_activity_map(db: Session = Depends(get_db)):
    checkins_with_location = db.query(models.HabitCheckIn).filter(
        models.HabitCheckIn.latitude.isnot(None),
        models.HabitCheckIn.longitude.isnot(None)
    ).join(models.Habit).all()
    
    map_data = []
    for checkin in checkins_with_location:
        map_data.append({
            "id": checkin.id,
            "latitude": checkin.latitude,
            "longitude": checkin.longitude,
            "activity_type": checkin.habit.activity_type.value,
            "description": checkin.habit.description,
            "date": checkin.date,
            "impact_score": checkin.impact_score
        })
    
    return map_data

#get leaderboard depending on time
@app.get("/community/leaderboard")
def get_community_leaderboard(timeframe: str = "month", db: Session = Depends(get_db)):
    if timeframe == "week":
        cutoff_date = date.today() - timedelta(days=7)
    elif timeframe == "month":
        cutoff_date = date.today() - timedelta(days=30)
    elif timeframe == "year":
        cutoff_date = date.today() - timedelta(days=365)
    else:
        cutoff_date = date(2020, 1, 1) 
    
    leaderboard = db.query(
        models.User.name,
        func.sum(models.HabitCheckIn.impact_score).label('total_score'),
        func.count(models.HabitCheckIn.id).label('total_checkins')
    ).join(models.Habit).join(models.HabitCheckIn).filter(
        models.HabitCheckIn.date >= cutoff_date
    ).group_by(models.User.id, models.User.name).order_by(
        desc('total_score')
    ).limit(10).all()
    
    return [
        {
            "rank": idx + 1,
            "name": name,
            "impact_score": float(total_score),
            "total_checkins": total_checkins
        }
        for idx, (name, total_score, total_checkins) in enumerate(leaderboard)
    ]

# update habits to include the type of activty
@app.post("/habits/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    try:
        print(f"Creating habit with description: {habit.description}")
        
        # determine type
        activity_type = determine_activity_type(habit.description)
        impact_score = get_impact_score_for_activity(activity_type)
        
        new_habit = models.Habit(
            description=habit.description, 
            owner_id=current_user.id,
            activity_type=activity_type,
            impact_score=impact_score
        )
        db.add(new_habit)
        db.commit()
        db.refresh(new_habit)
        print(f"Successfully created habit with ID: {new_habit.id}")
        return new_habit
    except Exception as e:
        print(f"Error creating habit: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create habit")

#matching keywords for the activity
def determine_activity_type(description: str) -> ActivityType:
    desc_lower = description.lower()
    
    if any(word in desc_lower for word in ['beach', 'cleanup', 'trash', 'litter', 'garbage']):
        return ActivityType.BEACH_CLEANUP
    elif any(word in desc_lower for word in ['plastic', 'bag', 'bottle', 'straw', 'packaging']):
        return ActivityType.PLASTIC_REDUCTION
    elif any(word in desc_lower for word in ['seafood', 'fish', 'sustainable', 'local']):
        return ActivityType.SUSTAINABLE_SEAFOOD
    elif any(word in desc_lower for word in ['water', 'shower', 'conservation']):
        return ActivityType.WATER_CONSERVATION
    elif any(word in desc_lower for word in ['wildlife', 'turtle', 'whale', 'dolphin', 'coral']):
        return ActivityType.WILDLIFE_PROTECTION
    else:
        return ActivityType.OCEAN_EDUCATION

#impact score based on the type of activity
def get_impact_score_for_activity(activity_type: ActivityType) -> float:
    impact_scores = {
        ActivityType.BEACH_CLEANUP: 5.0,
        ActivityType.PLASTIC_REDUCTION: 3.0,
        ActivityType.SUSTAINABLE_SEAFOOD: 4.0,
        ActivityType.WATER_CONSERVATION: 2.0,
        ActivityType.WILDLIFE_PROTECTION: 4.0,
        ActivityType.OCEAN_EDUCATION: 1.0
    }
    return impact_scores.get(activity_type, 1.0)