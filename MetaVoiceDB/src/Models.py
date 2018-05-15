from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime
import json

Base = declarative_base()

class User_Profile(Base):
    __tablename__ = 'User_Profiles'

    # Maps Userprofile class to User class
    User = relationship("User", back_populates="User_Profile")

    UserId = Column(Integer, ForeignKey('Users.Id'), primary_key=True )
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

    def __init__(self, UserId=None,Fname=None,Lname=None,Company=None,Address=None, Premise=None,
                Country=None,City=None,State=None,Zipcode=None,Cell=None):
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
        return

    def dict(self):
        return {
            'userId' : self.UserId,
            'firstName' : self.Fname,
            'lastName' : self.Lname,
            'company' : self.Company,
            'address' : self.Address,
            'premise' : self.Premise,
            'country' : self.Country,
            'city' : self.City,
            'state' : self.State,
            'zipcode' : self.Zipcode,
            'cell' : self.Cell
        }

class User(Base):
    __tablename__ = 'Users'

    Id = Column( Integer , primary_key = True)
    Email = Column(String(60))
    Password = Column(String(20))
    IsAdmin = Column(Boolean)

    # Maps Userprofile class to User class
    User_Profile = relationship('User_Profile', uselist = False,
                                order_by=User_Profile.UserId,back_populates="User")
    Skills = relationship('Skills')

    def __init__(self, Id=None, Email=None, Password=None, IsAdmin=None,User_Profile=None):
        self.Id = Id
        self.Email = Email
        self.Password = Password
        self.IsAdmin = IsAdmin
        self.User_Profile = User_Profile
        return

    def __str__(self):
        return "User(%r, %r, %r)" % (self.Id, self.Username, self.Password)

    def dict(self):
        return {
            'Id' : self.Id,
            'Email' : self.Email,
            'Password' : self.Password,
            'IsAdmin' : self.IsAdmin
        }

class Skills(Base):
    __tablename__ = 'Skills'

    SkillId = Column(Integer, primary_key=True)
    UserId = Column(Integer, ForeignKey('Users.Id'))
    AMZ_SkillId = Column(String(60))
    Name = Column(String(60))
    Status = Column(String(20))
    Category = Column(String(40))
    ShortDesc = Column(String(60))
    LongDesc = Column(String(200))
    Keywords = Column(String(200))
    Invoke = Column(String(60))
    Template = Column ( String ( 50 ) )
    CreationDate = Column(DateTime, default=datetime.datetime.utcnow)

    # Maps many to many relationship with Utterances and Responses
    Feeds = relationship('Feed')
    Utterances = relationship('Utterances')
    Responses = relationship('Response')

    Template = Column(String(50))
    CreationDate = Column(DateTime())

    def __init__(self,Name=None, SkillId=None, UserId=None, AMZ_SkillId=None, Status=None,
                Category=None,ShortDesc=None,LongDesc=None,
                 Keywords=None,Template=None, Invoke=None, CreationDate = None):
        self.Name = Name
        self.SkillId = SkillId
        self.UserId = UserId
        self.AMZ_SkillId = AMZ_SkillId
        self.Status = Status
        self.Category = Category
        self.ShortDesc = ShortDesc
        self.LongDesc = LongDesc
        self.Keywords = Keywords
        self.CreationDate = CreationDate
        self.Template = Template
        self.Invoke = Invoke
        self.CreationDate = CreationDate
        return

    def dict(self):
        return {
            'Name' : self.Name,
            'SkillId' : self.SkillId,
            'UserId' : self.UserId,
            'AMZ_SkillId' : self.AMZ_SkillId,
            'Status' : self.Status,
            'Category' : self.Category,
            'ShortDesc' : self.ShortDesc,
            'LongDesk' : self.LongDesc,
            'Keywords' : self.Keywords,
            'CreationDate' : self.CreationDate,
            'Template' : self.Template,
            'Invoke' : self.Invoke,
            'CreationDate' : self.CreationDate
        }

class Utterances(Base):
    __tablename__ = 'Utterances'

    UtterId = Column(Integer, primary_key=True)
    SkillId = Column(Integer, ForeignKey('Skills.SkillId'))
    Utter = Column(String(100))
    IntentId = Column(Integer, ForeignKey('Intents.IntentId'))

    def __init(self,UtterId=None,SkillId=None,Utter=None, IntentId=None):
        self.UtterId = UtterId
        self.SkillId = SkillId
        self.Utter = Utter
        self.IntentId = IntentId
        return
    def dict(self):
        return {
            'UtterId' : self.UtterId,
            'SkillId' : self.SkillId,
            'Utter' : self.Utter,
            'IntentId' : self.IntentId
        }

class Response(Base):
    __tablename__ = 'Responses'

    RespId = Column(Integer, primary_key=True)
    SkillId = Column(Integer, ForeignKey('Skills.SkillId'))
    IntentId = Column(Integer, ForeignKey('Intents.IntentId'))
    Resp = Column(String(100))


    def __init__(self,RespId=None,SkillId=None,Resp=None, IntentId=None):
        self.RespId = RespId
        self.SkillId = SkillId
        self.Resp = Resp
        self.IntentId = IntentId
        return

    def dict(self):
        return {
            'RespId' : self.RespId,
            'SkillId' : self.SkillId,
            'Resp' : self.Resp,
            'IntentId' : self.IntentId
        }

class Feed(Base):
    __tablename__ = 'Feeds'

    SkillId = Column(Integer, ForeignKey('Skills.SkillId'))
    FeedId = Column(Integer,primary_key=True)
    Name = Column(String(40))
    Preamble = Column(String(100))
    UpdateFreq = Column(String(10))
    Genre = Column(String(40))
    URL = Column(String(200))

    def __init__(self,SkillId=None,FeedId=None,Name=None,Preamble=None,UpdateFreq=None,Genre=None,URL=None):
        self.FeedId = FeedId
        self.SkillId = SkillId
        self.Name = Name
        self.Preamble = Preamble
        self.UpdateFreq = UpdateFreq
        self.Genre = Genre
        self.URL = URL
        return

    def dict(self):
        return {
            'FeedId' : self.FeedId,
            'Name' : self.Name,
            'Preamble' : self.Preamble,
            'UpdateFreq' : self.UpdateFreq,
            'Genre' : self.Genre,
            'URL' : self.URL
        }

class Intent(Base):
    __tablename__ = 'Intents'

    IntentId = Column(Integer, primary_key=True)
    SkillId = Column(Integer, ForeignKey('Skills.SkillId'))
    Intent = Column(String(100))

    def __init__(self,IntentId = None, SkillId = None, Intent = None):
        self.IntentId = IntentId
        self.SkillId = SkillId
        self.Intent = Intent

    def dict(self):
        return {
            'IntentId' : self.IntentId,
            'SkillId' : self.SkillId,
            'Intent' : self.Intent
        }
