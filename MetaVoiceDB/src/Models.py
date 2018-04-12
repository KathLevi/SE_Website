from sqlalchemy import Column, Integer, String, Boolean
from src.database import Base

class User(Base):
    Id = Column( Integer , primary_key = True)
    Username = Column(String(20))
    Password = Column(String(20))
    IsAdmin = Column(Boolean)

    def __init__(self, Id=None, Username=None, Password=None, IsAdmin=None)
        self.Id = Id
        self.Username = Username
        self.Password = Password
        self.IsAdmin = IsAdmin
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
    Cell = Column(String(15))
    Email = Column(String(60))

    def __init__(self, UserId=None,Fname=None,Lname=None,Company=None,Address=None, Premise=None, 
                Country=None,City=None,State=None,Zipcode=None,Cell=None,Email=None):
        self.UserId = UserId
        self.Fname = Fname
        self.Lname = Lname
        self.Company = Company
        self.Address = Address
        self.Premise = Premise
        self.Country = Country
        self.City = City
        self.State = State
        self.Zipcode = Zipcode
        self.Cell = Cell
        self.Email = Email
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
    TemplateId = Column(Integer)

    def __init__(self, SkillId=None, UserId=None, AMZ_SkillId=None, Status=None,
                Category=None,ShortDesc=None,LongDesc=None,Keywords=None,TemplateId=None):
        self.SkillId = SkillId
        self.UserId = UserId
        self.AMZ_SkillId = AMZ_SkillId
        self.Status = Status
        self.Category = Category
        self.ShortDesc = ShortDesc
        self.LongDesc = LongDesc
        self.Keywords = Keywords
        self.TemplateId = TemplateId        
        return

class Utterances(Base):
    UtterId = Column(Integer, primary_key=True)
    SkillId = Column(Integer)
    Utter = Column(String(100))

    def __init(self,UtterId=None,SkillId=None,Utter=None):
        self.UtterId = UtterId
        self.SkillId = SkillId
        self.Utter = Utter
        return

class Response(Base):
    RespId = Column(Integer primary_key=True)
    SkillId = Column(Integer)
    Resp = Column(String(100))

    def __init__(self,RespId=None,SkillId=None,Resp=None):
        self.RespId = RespId
        self.SkillId = SkillId
        self.Resp = Resp
        return

class Template(Base):
    TemplateId = Column(Integer, primary_key=True)
    Name = Column(String(20))
    
    def __init__(self, TemplateId=None, Name=None):
        self.TemplateId = TemplateId
        self.Name = Name
        return