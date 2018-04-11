from sqlalchemy import Column, Integer, String, Boolean
from src.database import Base


class User(Base):
    Id = Column( Integer , primary_key = True)
    Username = Column(String(20))
    Password = Column(String(20))
    IsAdmin = Column(Boolean)

    def __init__(self)
        return

class User_Profile(Base):
    UserId = Column(Integer, primary_key=True)
    Fname = Column(String(20))
    Lname = Column(String(20))
    Company = Column(String(40))
    Address = Column(String(40))
    Premise = Column(String(20))
    Country = Column(String(40))
    City = Column(String(40))
    State = Column(String(20))
    Zipcode = Column(Integer)
    Country = Column(String(40))
    Cell = Column(String(15))
    Email = Column(String(60))

    def __init__(self):
        return

class Skills(Base):
    SkillId = Column(Integer, primary_key=True)
    UserId = Column(Integer)
    AMZ_SkillId = Column(String(60))
    Status = Column(String(20))
    Category = Column(Integer)
    ShortDesc = Column(String(60))
    LongDesc = Column(String(200))
    Keywords = Column(String(200))
    Template = Column(Integer)

    def __init__(self):
        return

class Utterances(Base):
    UtterId = Column(Integer, primary_key=True)
    SkillId = Column(Integer)
    Utter = Column(String(100))

    def __init(self):
        return
class Response(Base):
    RespId = Column(Integer primary_key=True)
    SkillId = Column(Integer)
    Resp = Column(String(100))

    def __init__(self):
        return

class Template(Base):
    TemplateId = Column(Integer, primary_key=True)
    Name = Column(String(20))