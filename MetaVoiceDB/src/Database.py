from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.Models import User , User_Profile , Base, Skills, Response, Utterances, Feed, Intent
import json as js
import datetime
from src.helpers.jsonHelper import jsonHelper
import requests
from .Config import Config

# TODO
# Split some of this up. There can be 'helper' classes that modulate these tasks more
# Modify /editskill to work with mutliple intents
# Modify /editskill to work with intents with multiple responses?
# Modify /newskill to work with multiple intents
# Modify /newskill to work with intents with multitple responses
# Find out why socket errors keep occuring when completing a large number of updates
# Modify methods that update rows so they are not deleting. Instead they are using the update() function
# Reorganize functions to be grouped by use
# Need to update ViewSkills to work properly
# Need to add submission of template type to skills
# Bug where users PW is not being checked for exactness, see upper/lower casing
# Need to send accurate info about why failed logins didint work
# Update DB to handle Datetime field in Skills
# Modify jsonHelper build functions to match with json datamodel, see register

config = Config()

class db:
    def __init__ ( self , conn_string=None ):
        self.conn_string = conn_string
        self.engine = create_engine ( conn_string , convert_unicode=True )

        self.host = config.local

        Base.metadata.create_all ( bind=self.engine )
        Session = sessionmaker ( bind=self.engine )
        self.session = Session ( )
        self.jsonHelper = jsonHelper()
        return

    def __str__ ( self ):
        return "Database(%r)" % (self.conn_string)

    # Function for checking the reason for an invalid login
    # returns an error type string
    def invalid_login(self,json):
        q = self.session.query(User).filter_by(Email=json['email']).one_or_none()
        if q:
            return 'Password Incorrect'
        else:
            return 'Username Incorrect'

    # Function that attempts to login the user to their account
    # Returns either that users login information or a detailed login error
    def attempt_login ( self , json ):
        status = {}
        print(json)
        try:
            q = self.get_user_and_profile ( Email=json[ 'email' ] , Password=json[ 'password' ] )
            if q is None:
                status['status'] = "INVALID_LOGIN"
                status['error'] = self.invalid_login(json)
            else:
                status['firstName'] = q.User_Profile.Fname
                status['lastName'] = q.User_Profile.Lname
                status['company'] = q.User_Profile.Company
                status['state'] = q.User_Profile.State
                status['email'] = q.Email
                status['cell'] = q.User_Profile.Cell
                status[ 'userId' ] = q.Id
                status[ 'status'] = "SUCCESS"
        except Exception as e:
            print ("Unexpected error at attempt_login: " +  str(e))
            status['status'] = "SERVER_ERROR"
            status['error'] = str(e)

        return status

    # Function that attempts to register a user under an email and pw
    # Returns either that the user was registered and their User_Profile information
    # or a detailed error of why the registration failed
    def attempt_register ( self , json ):
        resp = {}
        try:
            q = self.session.query ( User ).\
            filter_by( Email = json[ 'email' ] ).\
            one_or_none ( )

            if q is not None:
                resp[ 'status' ] = 'USER_ALREADY_EXISTS_ERROR'
                print("Failed to Register " + json[ 'email' ])
            else:
                self.session.add ( self.jsonHelper.build_user ( json ) )
                self.session.commit ( )
                q = self.get_user_and_profile ( Email=json[ 'email' ] , Password=json[ 'password' ] )
                print ("Attempting registration")
                print ( "Registered: " + q.Email )
                resp['userId'] = q.Id
                resp['status'] = "SUCCESS"

        except Exception as e:
                print ("Unexpected error at attempt_register: " + str(e))
                resp['status'] = "SERVER_ERROR"
                resp['error'] = str(e)

        return resp

    # Function that gets a list of skills for a user on that users UserId
    # LIMIT HAS NOT BEEN IMPLEMENTED DO NOT USE
    # Does not return detailed error as to why skills were not returned
    def attempt_get_skills(self,UserId,limit=None):
        skills = self.get_skills(Id=UserId)
        return skills

    # Returns a User object joined with that users User_Profile
    def get_user_and_profile ( self , Email=None , Password=None,Id=None ):
        q = None
        if Email != None and Password != None:
            q = self.session.query ( User ).\
                join ( User_Profile ).\
                filter ( User.Id == User_Profile.UserId ).\
                filter ( User.Email == Email ).\
                filter ( User.Password == Password ).\
                one_or_none ( )
        elif Id != None:
            q = self.session.query(User).\
                join(User_Profile).\
                filter(User.Id == User_Profile.UserId).\
                filter(User.Id == Id).\
                one_or_none()
        return q

    # Shuts down the DB engine
    def shutdown ( self ):
        return self.engine.dispose ( )

    # Function that gets a list of skills for a user on that users UserId
    # LIMIT HAS NOT BEEN IMPLEMENTED DO NOT USE
    # Does not return detailed error as to why skills were not returned
    def get_skills(self,Id,Limit=None):
        viewskills = []
        if Limit:
            print("Limit!")
        else:
            SkillIds = self.session.query ( Skills ).filter_by ( UserId = Id ).all()
            for idx, skill in enumerate(SkillIds):
                viewskills.append(skill.dict())
                viewskills[idx]['CreationDate'] = str(viewskills[idx]['CreationDate'])
                viewskills[idx]['Responses'] = self.get_skill_resps(Id=skill.SkillId)
                viewskills[idx]['Utterances'] = self.get_skill_uttrs(Id=skill.SkillId)
                if skill.Template == 'Alexa Flash Briefing':
                    viewskills[ idx ][ 'feeds' ] = self.get_skill_feeds ( skill.SkillId )
                else:
                    viewskills[ idx ][ 'intents' ] = self.get_skill_intent ( skill.SkillId )
        return viewskills

    # Submits list of new Feed objects to the database on a certain SkillId
    def submit_feeds(self,json,id):
        try:
            feeds = json.get ( 'feeds' , None )
            if feeds:
                for feed in feeds:
                    self.session.add ( self.jsonHelper.build_feed ( feed , id ) )
        except Exception as e:
            print('Unexpected error in submit_feeds: ' + str(e))
        return

    # Submits list of new Utterance objects to the database on a certain SkillId
    def submit_uttrs(self,json,SkillId,IntentId):
        try:
            utters = json.get ( 'utterances' , None )
            if utters:
                for ut in utters:
                    self.session.add ( self.jsonHelper.build_utter ( utters[ut] , SkillId, IntentId ) )
        except Exception as e:
            print('Unexpected error in submit_uttrs: ' + str(e))
        return

    # Submits list of new Response objects to the database on a certain SkillId
    # TODO make sure to check here when modifying to submit skills with multiple responses
    # Add for loop for each element in 'responses' key
    # currently only grabs 'response' key and submits whatever that is
    def submit_resps(self,json,SkillId,IntentId):
        try:
            resps = json.get ( 'response' , None )
            if resps:
                self.session.add ( self.jsonHelper.build_resp ( resps , SkillId, IntentId ) )
        except Exception as e:
            print('Unexpected error in submit_resps: ' + str(e))
        return

    # Function that creates a new skill from a JSON object
    # returns the new SkillId upon sucess
    # returns a error status and reason upon failure
    def new_skill(self,json):
        response = {}
        s = self.jsonHelper.build_skill(json)
        try:
            self.session.add(s)
            self.session.flush()
            self.session.refresh(s)
            if json.get('template', None) == 'Alexa Flash Briefing':
                self.submit_feeds(json,s.SkillId)
            else:
                # Need to restructure to work with Intents
                self.submit_new_intent(json,s.SkillId)

            self.session.commit()
            response['SkillId'] = s.SkillId
            response['skill'] = s.dict()
            response['status'] = "SUCCESS"

        except Exception as e:
            print ("Unexpected error at new_skill: " + str(e))
            response['status'] = "SERVER_ERROR"
            response['error'] = str(e)
        return response

    # Function that returns a list of Response objects for a certain SkillId
    def get_skill_resps(self,Id,):
        Resps = []
        _ = self.session.query ( Response ).filter_by ( IntentId=Id ).all ( )
        for r in _:
            Resps.append(r.dict())

        return Resps

    # Function taht reutnrs a list of Utterance objects for a certain SkillId
    def get_skill_uttrs(self,Id):
        Utters = []
        _ = self.session.query ( Utterances ).filter_by ( IntentId=Id ).all ( )
        for u in _:
            Utters.append ( u.dict ( ) )
        return Utters

    # Function that takes in a FULL SKILL JSON OBJECT and attempts to resubmit it to the database
    # Updates the skill and then replaces information for the Skills database dependencies
    # Sends error message upon issue editing the object
    def edit_skill(self,json):
        response = {}
        if type(json) != dict:
            json = js.loads ( json )
        try:
            q = self.session.query ( Skills ). filter_by( SkillId=json.get('SkillId') ). one_or_none( )
            if q:
                if json.get('template', None) == 'Alexa Flash Briefing':
                    q = self.update_skill(q,json)
                    self.replace_feeds(json,q.SkillId)
                    self.session.commit()
                else:
                    q = self.update_skill(q,json)
                    self.replace_intents(json,q.SkillId)
                    response['Id'] = q.SkillId

                    self.session.commit()
            else:
                response['status'] = 'EDIT_ERROR'
                response['error'] = 'Skill does not exist. Why are you trying to edit it?'
        except Exception as e:
            print("Unexpected error at edit_skill: " + str(e))
            response['status'] = 'SERVER_ERROR'
            response['error'] = str(e)

        return response

    # Function that deletes all Utterances based on a SkillId
    # Submits new Utterances from JSON object
    def replace_uttrs(self,json,SkillId, OldIntentId, NewIntentId):
        try:
            _ = self.session.query(Utterances).filter_by(IntentId=OldIntentId).all()
            for x in _:
                self.session.delete(x)

            self.session.commit()
            self.submit_uttrs(json['intents'][0], SkillId, NewIntentId)

        except Exception as e:
            print('Unexpected error in replace_uttrs: ' + str(e))
        return

    # Function that deletes all Feeds based on a SkillId
    # Submits new Feeds from JSON object
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

    # Function that deletes all Responses based on a SkillId
    # Submits new Responses from JSON object
    def replace_resps(self,json,SkillId, OldIntentId,NewIntentId):
        try:
            _ = self.session.query(Response).filter_by(IntentId=OldIntentId).all()
            for x in _:
                self.session.delete(x)
            self.session.commit()
            self.submit_resps(json['intents'][0], SkillId, NewIntentId)
        except Exception as e:
            print('Unexpected error in replace_resps: ' + str(e))
        return

    #TODO Needs to be able to work for multiple intents
    def replace_intents(self,json,SkillId):
        try:
            _ = self.session.query(Intent).filter_by(SkillId=SkillId).all()
            for x in _:
                id = x.IntentId
                self.session.delete(x)
                IntentId = self.submit_intent(json,SkillId)
                self.replace_resps(json, SkillId, id, IntentId)
                self.replace_uttrs(json, SkillId, id, IntentId)
        except Exception as e:
            print("Unexpected error in replace_intents: " + str(e))

    # Replaces a Skill DB objects attributes necessary for a Skill Edit
    # Returns the new Skill DB object
    def update_skill(self,Skill,json):
        Skill.Name = json.get('skillName')
        Skill.Status = json.get('status')
        Skill.Category = json.get('category')
        Skill.ShortDesc = json.get('shortDescription')
        Skill.LongDesc = json.get('longDescription')
        Skill.Keywords = str(json.get('keywords'))
        Skill.Template = json.get('template')
        return Skill

    # creates a new intent, submits to the DB and then maps the responses and utterances to that intent
    # TODO Modify to allow for multiple intents
    def submit_new_intent(self,json,id):
        IntentId = self.submit_intent(json,id)
        try:
            self.submit_uttrs(json['intents'][0], id, IntentId)
            self.submit_resps(json['intents'][0], id, IntentId)

        except Exception as e:
            print("Unexpencted error in submit_intent: " + str(e))

        return

    # Function that builds and submits a new intent
    # returns the new intents id
    def submit_intent(self,json,id):
        i = Intent(
            SkillId=id,
            Intent=json['intents'][0].get('intent','default intent')
        )
        try:
            self.session.add(i)
            self.session.flush()
            self.session.refresh(i)

            return i.IntentId
        except Exception as e:
            print('Unexpected error in submit_intent: ' + str(e))

        return

    def get_skill_intent(self,id):
        intents = []
        _ = self.session.query ( Intent ).filter_by ( SkillId=id ).all ( )
        for intent in _:
            id = intent.IntentId
            intent = intent.dict()
            intent['utterances'] = self.get_skill_uttrs(id)
            intent['response'] = self.get_skill_resps(id)
            intents.append(intent)
        return intents

    def get_skill_feeds(self,id):
        feeds = []
        _ = self.session.query(Feed).filter_by(SkillId=id).all()
        for feed in _:
            feeds.append(feed.dict())

        return feeds

    #NOT IMPLEMENTED FULLY YET
    def submit_skill(self,json):

        Id = json.get ( 'SkillId' , 0 )

        if Id == 0:
            # Submit new skill to db and then
            resp = self.new_skill ( json )
            if resp[ 'status' ] == 'SUCCESS':
                json[ 'SkillId' ] = resp[ 'SkillId' ]
            else:
                json['submitToDb'] = 'FAILED'

            if json.get ( 'firstName' , 'Default' ) == 'Default' or json.get ( 'lastName' , 'Default' ) == 'Default':
                u = self.get_user_and_profile ( Id=json.get ( 'UserId' , 0 ) )
                json[ 'firstName' ] = u.Fname
                json[ 'lastName' ] = u.Lname
        else:
            # Update and submit skill from DB
            self.edit_skill ( json )
            if json.get ( 'firstName' , 'Default' ) == 'Default' or json.get ( 'lastName' , 'Default' ) == 'Default':
                u = self.get_user_and_profile ( Id=json.get ( 'UserId' , 0 ) )
                json[ 'firstName' ] = u.Fname
                json[ 'lastName' ] = u.Lname

        if json[ 'template' ] == 'Alexa Flash Briefing':
            # Submit to service two
            resp = requests.post ( config.local + ':5003/post' , json=js.dumps(json) )
            return resp.status_code
        else:
            # Submit to service one
            resp = requests.post ( config.local + ':5001/post' , json=js.dumps(json) )
            return resp.status_code

        return

    def attempt_get_profile(self,json):
        email = ""
        users = self.session.query ( User ).filter_by ( Id = json.get('userId') ).all()
        if users:
            email = users[0].Email

        profiles = self.session.query ( User_Profile ).filter_by ( UserId = json.get('userId') ).all()
        if profiles:
            response = profiles[0].dict()
            response['email'] = email
            return response
        else:
            return {}

    def delete_skill(self, id):
        status = {}
        q = self.session.query(Skills).filter_by(SkillId = id).one_or_none()
        n = 0
        if q:
            # check what kind of skill it is
            if q.Template == 'Alexa Flash Briefing':
                # Deleted Feeds
                n = self.session.query(Skills).filter_by(SkillId = id).delete()
                n += self.session.query(Feed).filter_by(SkillId = id).delete()
            else:
                # delete associated feeds/utters/resps/intents
                n = self.session.query(Skills).filter_by(SkillId = id).delete()
                n += self.session.query(Intent).filter_by(SkillId = id).delete()
                n += self.session.query(Utterances).filter_by(SkillId = id).delete()
                n += self.session.query(Response).filter_by(SkillId = id).delete()
        else:
            print("How did you get here")
            # didnt exist so you cant delete it
            # how did you get here?
        self.session.commit()
        # Returns number of rows affected, should be more than zero
        status['rows'] = n
        return status