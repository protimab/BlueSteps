from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class HabitBase(BaseModel):
    description: str

class HabitCreate(HabitBase): #what the frontend sends
    pass

class Habit(HabitBase): #what the backend returns
    id: int
    owner_id: int

    class Config:
        orm_mode = True
