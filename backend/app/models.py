from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    habits = relationship("Habit", back_populates="owner") #one user can have many habits

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True) #unique ID for each habit
    description = Column(String, nullable=False) #the habit
    timestamp = Column(DateTime, default=datetime.utcnow) #time
    owner_id = Column(Integer, ForeignKey("users.id")) #user link

    owner = relationship("User", back_populates="habits") #connect User and habits
