from .db import engine, Base
from . import models

Base.metadata.create_all(bind=engine)
