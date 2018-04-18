from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.Models import User , User_Profile , Base, Skills, Response, Utterances


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
        try:
            q = self.get_user_and_profile ( Email=json[ 'Email' ] , Password=json[ 'Password' ] )
            if q is None:
                status['status'] = "INVALID_LOGIN"
            else:
                status[ 'userId' ] = q.Id
                status[ 'status'] = "SUCCESS"
        except Exception as e:
            print ("Unexpected error at attempt_login: " +  e)
            status['status'] = "SERVER_ERROR"
        return status

    def attempt_register ( self , json ):
        resp = {}

        q = self.session.query ( User ).\
            filter_by( Email = json[ 'Email' ] ).\
            one_or_none ( )

        if q is not None:
            resp[ 'status' ] = 'USER_ALREADY_EXISTS_ERROR'
            print("Failed to Register " + json[ 'Email' ])
        else:
            try:
                self.session.add ( self.build_user ( json ) )
                self.session.commit ( )
                q = self.get_user_and_profile ( json[ 'Email' ] , json[ 'Password' ] )
                print ("Attempting registration")
                print ( "Registered: " + q.Email )

                resp['userId'] = q.Id
                resp['status'] = "SUCCESS"
            except Exception as e:
                print ("Unexpected error at attempt_register: " + e)
                resp['status'] = "SERVER_ERROR"

        return resp

    def attempt_get_skills(self,UserId):
        # This can be a seperate function
        skills = self.get_skills(Id=UserId)
        return skills

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
            for id in viewskills.keys():
                Resps = self.session.query(Response).filter_by(SkillId = id).all()

                viewskills[id]['Responses'] = []
                viewskills[id]['Utterances'] = []

                for r in Resps:
                    viewskills[id]['Responses'].append(r.dict())
                Uttrs = self.session.query(Utterances).filter_by(SkillId = id).all()
                for u in Uttrs:
                    viewskills[id]['Utterances'].append(u.dict())
        return viewskills