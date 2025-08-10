from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str
    name: str  

class HabitBase(BaseModel):
    description: str

class HabitCreate(HabitBase): #what the frontend sends
    pass

class HabitCheckIn(BaseModel):
    id: int
    date: date
    habit_id: int
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    habit_description: Optional[str] = None

    class Config:
        orm_mode = True

class Habit(HabitBase): #what the backend returns
    id: int
    owner_id: int
    checkins: List[HabitCheckIn] = []

    class Config:
        orm_mode = True

class HabitCheckInCreate(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None

