from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Date
from sqlalchemy.orm import relationship
from datetime import datetime, date
from .db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False) 
    hashed_password = Column(String, nullable=False)

    habits = relationship("Habit", back_populates="owner")  # One user has many habits

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))
    checkins = relationship("HabitCheckIn", back_populates="habit", cascade="all, delete")
    owner = relationship("User", back_populates="habits")

class HabitCheckIn(Base):
    __tablename__ = "habit_checkins"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=date.today)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    latitude = Column(Float, nullable=True)  
    longitude = Column(Float, nullable=True) 
    habit = relationship("Habit", back_populates="checkins")
