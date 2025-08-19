from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Date, Enum as SQLEnum, Text
from sqlalchemy.orm import relationship
from datetime import datetime, date
import enum
from .db import Base

class ActivityType(enum.Enum):
    BEACH_CLEANUP = "beach_cleanup"
    PLASTIC_REDUCTION = "plastic_reduction"
    SUSTAINABLE_SEAFOOD = "sustainable_seafood"
    OCEAN_EDUCATION = "ocean_education"
    WATER_CONSERVATION = "water_conservation"
    WILDLIFE_PROTECTION = "wildlife_protection"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False) 
    hashed_password = Column(String, nullable=False)
    total_impact_score = Column(Float, default=0.0) #total impact
    created_at = Column(DateTime, default=datetime.utcnow) 

    habits = relationship("Habit", back_populates="owner")  # One user has many habits

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    impact_score = Column(Float, default=1.0) 
    activity_type = Column(SQLEnum(ActivityType), default=ActivityType.OCEAN_EDUCATION) #points per check in
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
    impact_score = Column(Float, default=1.0) #points for current check in
    notes = Column(Text, nullable=True)

    habit = relationship("Habit", back_populates="checkins")

class CommunityStats(Base):
    __tablename__ = "community_stats"
    
    id = Column(Integer, primary_key=True)
    date = Column(Date, default=date.today)
    total_checkins = Column(Integer, default=0)
    total_users = Column(Integer, default=0)
    total_impact_score = Column(Float, default=0.0)
    activity_breakdown = Column(Text) 
