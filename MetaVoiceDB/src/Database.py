from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.Models import User , User_Profile , Base, Skills, Response, Utterances, Feed
import json as js

class db:
    def __init__ ( self , conn_string=None ):
        self.conn_string = conn_string
        self.engine = create_engine ( conn_string , convert_unicode=True )

        Base.metadata.create_all ( bind=self.engine )
        Session = sessionmaker ( bind=self.engine )
        self.session = Session ( )
        return

    def __str__ ( self ):
        return "Database(%r)" % (self.conn_string)

    def attempt_login ( self , json ):
        status = {}
        json = js.loads(json)
        try:
            q = self.get_user_and_profile ( Email=json[ 'Email' ] , Password=json[ 'Password' ] )
            if q is None:
                status['status'] = "INVALID_LOGIN"
            else:
                status[ 'userId' ] = q.Id
                status[ 'status'] = "SUCCESS"
        except Exception as e:
            print ("Unexpected error at attempt_login: " +  str(e))
            status['status'] = "SERVER_ERROR"
        return status

    def attempt_register ( self , json ):
        resp = {}
            
        try:
            q = self.session.query ( User ).\
            filter_by( Email = json[ 'Email' ] ).\
            one_or_none ( )

            if q is not None:
                resp[ 'status' ] = 'USER_ALREADY_EXISTS_ERROR'
                print("Failed to Register " + json[ 'Email' ])
            else:
                self.session.add ( self.build_user ( json ) )
                self.session.commit ( )
                q = self.get_user_and_profile ( json[ 'Email' ] , json[ 'Password' ] )
                print ("Attempting registration")
                print ( "Registered: " + q.Email )

                resp['userId'] = q.Id
                resp['status'] = "SUCCESS"
        except Exception as e:
                print ("Unexpected error at attempt_register: " + str(e))
                resp['status'] = "SERVER_ERROR"

        return resp

    def attempt_get_skills(self,UserId,limit=None):
        # This can be a seperate function
        skills = self.get_skills(Id=UserId)
        return skills

    def build_feed(self, feed,SkillId):
        try:
            f = Feed(
            Name = feed.get('Name', 'Default') ,
            SkillId = SkillId , 
            Preamble= feed.get('Preamble', 'Default') ,
            UpdateFreq= feed.get('UpdateFreq', 'Default') ,
            Genre = feed.get('Genre', 'Default') ,
            URL = feed.get('URL', 'Default')
        )
            return f
        except Exception as e:
            print("Unexpected error at build_feed: " + str(e))
        return "SERVER_ERROR"

    def build_user ( self , json ):
        u = User(
            Email=json[ 'Email' ] ,
            Password=json[ 'Password' ] ,
            IsAdmin=0)
        up = User_Profile (
                Fname=json.get('Fname', 'Default') ,
                Lname=json.get('Lname', 'Default'),
                Company=json.get('Company', 'Default') ,
                Address=json.get('Address', 'Default') ,
                Premise=json.get('Premise', 'Default') ,
                Country=json.get('Country', 'Default') ,
                City=json.get('City', 'Default') ,
                State=json.get('State', 'Default') ,
                Zipcode=json.get('Zipcode', 99999) ,
                Cell=json.get('Cell', 'Default')
            )
        u.User_Profile = up
        return u

    def build_utter(self,ut,SkillId):
        return Utterances(
            SkillId = SkillId,
            Utter = ut
        )

    def build_resp(self,resp,SkillId):
        return Response(
            SkillId=SkillId,
            Resp=resp
        )

    def build_skill(self,json):
        Keywords = json.get('Keywords', 'Default')
        return Skills(
            UserId=json.get("UserId",0) ,
            Name=json.get("Name","Default Name"),
            AMZ_SkillId= json.get('AMZ_SkillId','Default') ,
            Status=json.get('Status', 'In Development') ,
            Category=json.get('Category','Default') , 
            ShortDesc=json.get('ShortDesc', 'Default'),
            LongDesc=json.get('LongDesc', 'Default') ,
            Keywords= str(Keywords),
            TemplateId=0,
            SkillId=json.get('SkillId', None)
        )
        
    def get_user_and_profile ( self , Email , Password ):
        q = self.session.query ( User ).\
            join ( User_Profile ).\
            filter ( User.Id == User_Profile.UserId ).\
            filter ( User.Email == Email ).\
            filter ( User.Password == Password ).\
            one_or_none ( )
        return q

    def shutdown ( self ):
        return self.engine.dispose ( )

    def get_skills(self,Id,Limit=None):
        viewskills = {}
        if Limit:
            print("Limit!")
        else:
            SkillIds = self.session.query ( Skills ).filter_by ( UserId = Id ).all()

            for Skill in SkillIds:
                viewskills[Skill.SkillId] = Skill.dict()
                viewskills[Skill.SkillId]['Responses'] = self.get_skill_resps(Id=Skill.SkillId)
                viewskills[Skill.SkillId]['Utterances'] = self.get_skill_uttrs(Id=Skill.SkillId)

        return viewskills

    def submit_feeds(self,json,id):
        try:
            feeds = json.get ( 'Feeds' , None )
            if feeds:
                for feed in feeds:
                    self.session.add ( self.build_feed ( feed , id ) )
        except Exception as e:
            print('Unexpected error in submit_feeds: ' + str(e))
        return

    def submit_uttrs(self,json,id):
        try:
            utters = json.get ( 'Utterances' , None )
            SkillUtterances = [ ]
            if utters:
                for ut in utters:
                    self.session.add ( self.build_utter ( ut , id ) )
        except Exception as e:
            print('Unexpected error in submit_uttrs: ' + str(e))
        return

    def submit_resps(self,json,id):
        try:
            resps = json.get ( 'Responses' , None )
            if resps:
                for resp in resps:
                    self.session.add ( self.build_resp ( resp , id ) )
        except Exception as e:
            print('Unexpected error in submit_resps: ' + str(e))
        return

    def new_skill(self,json):
        response = {}
        json = js.loads ( json )
        s = self.build_skill(json)
        try:
            self.session.add(s)
            self.session.flush()
            self.session.refresh(s)
            
            if json.get('Template', None) == 'Alexa Flash Briefing':
                self.submit_feeds(json,s.SkillId)
            else:
                self.submit_uttrs(json,s.SkillId)
                self.submit_resps(json,s.SkillId)

            self.session.commit()
            response['SkillId'] = s.SkillId
            response['status'] = "SUCCESS"
        
        except Exception as e:
            print ("Unexpected error at new_skill: " + str(e))
            response['status'] = "SERVER_ERROR"
        
        return response

    def get_skill_resps(self,Id,):
        Resps = []
        _ = self.session.query ( Response ).filter_by ( SkillId=id ).all ( )
        for r in _:
            Resps.append(_.dict())

        return Resps

    def get_skill_uttrs(self,Id):
        Utters = []
        _ = self.session.query ( Utterances ).filter_by ( SkillId=id ).all ( )
        for u in _:
            Utters.append ( u.dict ( ) )
        return Utters

    def edit_skill(self,json):
        response = {}
        json = js.loads(json)
        try:
            q = self.session.query ( Skills ). filter_by( SkillId=json.get('SkillId') ). one_or_none( )
            if q:
                if json.get('Template', None) == 'Alexa Flash Briefing':
                    print('Flash Brief')
                    q = self.update_skill(q,json)
                    self.replace_feeds(json,q.SkillId)
                    self.session.commit()
                    # Need to swap out all the feeds
                else:
                    print('Skill is simple/complex')
                    q = self.update_skill(q,json)
                    self.replace_resps(json,q.SkillId)
                    self.replace_uttrs(json,q.SkillId)
                    self.session.commit()
            else:
                print('Skill does not exist. Try creating it')
        except Exception as e:
            print("Unexpected error at edit_skill: " + str(e))
            response['status'] = 'SERVER_ERROR'

        return

    def replace_uttrs(self,json,SkillId):
        try:
            _ = self.session.query(Utterances).filter_by(SkillId=SkillId).all()
            for x in _:
                self.session.delete(x)

            self.session.commit()
            self.submit_uttrs(json,SkillId)

        except Exception as e:
            print('Unexpected error in replace_uttrs: ' + str(e))
        return

    def replace_feeds(self,json,SkillId):
        try:
            _ = self.session.query ( Feed ).filter_by ( SkillId=SkillId ).all()
            for x in _:
                self.session.delete(x)
            self.session.commit()
            self.submit_feeds ( json , SkillId )

        except Exception as e:
            print ( 'Unexpected error in replace_uttrs: ' + str ( e ) )
        return

    def replace_resps(self,json,SkillId):
        try:
            _ = self.session.query(Response).filter_by(SkillId=SkillId).all()
            for x in _:
                self.session.delete(x)

            self.session.commit()
            self.submit_resps(json,SkillId)
        except Exception as e:
            print('Unexpected error in replace_resps: ' + str(e))
        return

    def update_skill(self,Skill,json):
        Skill.Name = json.get('Name')
        Skill.Status = json.get('Status')
        Skill.Category = json.get('Category')
        Skill.ShortDesc = json.get('ShortDesc')
        Skill.LongDesc = json.get('LongDesc')
        Skill.Keywords = str(json.get('Keywords'))
        return Skill
