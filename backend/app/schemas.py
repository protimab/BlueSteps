from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str

class HabitBase(BaseModel):
    description: str

class HabitCreate(HabitBase): #what the frontend sends
    pass

class HabitCheckIn(BaseModel):
    id: int
    date: date
    habit_id: int

    class Config:
        orm_mode = True

class Habit(HabitBase): #what the backend returns
    id: int
    owner_id: int
    checkins: List[HabitCheckIn] = []

    class Config:
        from_attributes = True

