from flask import jsonify
from sqlalchemy import create_engine, or_
from sqlalchemy.orm import sessionmaker
import datetime
import requests
import subprocess
import sys
import os
import json as js
from src.helpers.jsonHelper import jsonHelper
from src.Models import User, User_Profile, Base, Skills, Response, Utterances, Feed, Intent
from src.Config import Config


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
    def __init__(self, conn_string=None):
        self.conn_string = conn_string
        self.engine = create_engine(conn_string, convert_unicode=True)

        self.host = config.local

        Base.metadata.create_all(bind=self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
        self.jsonHelper = jsonHelper()
        return

    def __str__(self):
        return "Database(%r)" % (self.conn_string)

    # Function for checking the reason for an invalid login
    # returns an error type string
    def invalid_login(self, json):
        q = self.session.query(User).filter_by(
            Email=json['email']).one_or_none()
        if q:
            return 'Password Incorrect'
        else:
            return 'Username Incorrect'

    # Function that attempts to login the user to their account
    # Returns either that users login information or a detailed login error
    def attempt_login(self, json):
        status = {}
        print(json)
        try:
            q = self.get_user_and_profile(
                Email=json['email'], Password=json['password'])
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
                status['city'] = q.User_Profile.City
                status['zipcode'] = q.User_Profile.Zipcode
                status['country'] = q.User_Profile.Country
                status['userId'] = q.Id
                status['status'] = "SUCCESS"
        except Exception as e:
            print ("Unexpected error at attempt_login: " + str(e))
            status['status'] = "SERVER_ERROR"
            status['error'] = str(e)

        return status

    # Function that attempts to register a user under an email and pw
    # Returns either that the user was registered and their User_Profile information
    # or a detailed error of why the registration failed
    def attempt_register(self, json):
        resp = {}
        try:
            q = self.session.query(User).\
                filter_by(Email=json['email']).\
                one_or_none()

            if q is not None:
                resp['status'] = 'USER_ALREADY_EXISTS_ERROR'
                print("Failed to Register " + json['email'])
            else:
                self.session.add(self.jsonHelper.build_user(json))
                self.session.commit()
                q = self.get_user_and_profile(
                    Email=json['email'], Password=json['password'])
                print ("Attempting registration")
                print ("Registered: " + q.Email)
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
    def attempt_get_skills(self, UserId, limit=None):
        skills = self.get_skills(Id=UserId)
        return skills

    # Returns a User object joined with that users User_Profile
    def get_user_and_profile(self, Email=None, Password=None, Id=None):
        q = None
        if Email != None and Password != None:
            q = self.session.query(User).\
                join(User_Profile).\
                filter(User.Id == User_Profile.UserId).\
                filter(User.Email == Email).\
                filter(User.Password == Password).\
                one_or_none()
        elif Id != None:
            q = self.session.query(User).\
                join(User_Profile).\
                filter(User.Id == User_Profile.UserId).\
                filter(User.Id == Id).\
                one_or_none()
        return q

    # Shuts down the DB engine
    def shutdown(self):
        return self.engine.dispose()

    # Function that gets a list of skills for a user on that users UserId
    # LIMIT HAS NOT BEEN IMPLEMENTED DO NOT USE
    # Does not return detailed error as to why skills were not returned
    def get_skills(self, Id, Limit=None):
        viewskills = []
        if Limit:
            print("Limit!")
        else:
            print("querying for skills...")
            SkillIds = self.session.query(Skills).filter_by(UserId=Id).all()
            print("skills queried")
            for idx, skill in enumerate(SkillIds):
                viewskills.append(skill.dict())
                #viewskills[idx]['CreationDate'] = str(viewskills[idx]['CreationDate'])
                #viewskills[idx]['Responses'] = self.get_skill_resps(Id=skill.SkillId)
                #viewskills[idx]['Utterances'] = self.get_skill_uttrs(Id=skill.SkillId)
                # if skill.Template == 'Alexa Flash Briefing':
                #    viewskills[ idx ][ 'feeds' ] = self.get_skill_feeds ( skill.SkillId )
                # else:
                #    viewskills[ idx ][ 'intents' ] = self.get_skill_intent ( skill.SkillId )
        print("returning skill list")
        return viewskills

    def get_skill(self, SkillId):
        skill = {}
        try:
            sk = self.session.query(Skills).filter_by(SkillId=SkillId).all()
            if sk:
                skill = sk[0].dict()
                skill['Responses'] = self.get_skill_resps(Id=SkillId)
                skill['Utterances'] = self.get_skill_uttrs(Id=SkillId)
                if skill.Template == 'Alexa Flash Briefing':
                    skill['Feeds'] = self.get_skill_feeds(SkillId)
                else:
                    skill['Intents'] = self.get_skill_intent(SkillId)
        except Exception as e:
            print( 'Unexpected error in submit_resps: ' + str(e))

        return skill

    # Submits list of new Feed objects to the database on a certain SkillId
    def submit_feeds(self, json, id):
        try:
            feeds = json.get('feeds', None)
            if feeds:
                for feed in feeds:
                    self.session.add(self.jsonHelper.build_feed(feed, id))
        except Exception as e:
            print('Unexpected error in submit_feeds: ' + str(e))
        return

    # Submits list of new Utterance objects to the database on a certain SkillId
    def submit_uttrs(self, json, SkillId, IntentId):
        try:
            utters = json.get('utterances', None)
            if utters:
                for ut in utters:
                    self.session.add(self.jsonHelper.build_utter(
                        ut, SkillId, IntentId))
        except Exception as e:
            print('Unexpected error in submit_uttrs: ' + str(e))
        return

    # Submits list of new Response objects to the database on a certain SkillId
    # TODO make sure to check here when modifying to submit skills with multiple responses
    # Add for loop for each element in 'responses' key
    # currently only grabs 'response' key and submits whatever that is
    def submit_resps(self, json, SkillId, IntentId):
        try:
            resps = json.get('response', None)
            if resps:
                self.session.add(self.jsonHelper.build_resp(
                    resps, SkillId, IntentId))
        except Exception as e:
            print('Unexpected error in submit_resps: ' + str(e))
        return

    # Function that creates a new skill from a JSON object
    # returns the new SkillId upon sucess
    # returns a error status and reason upon failure
    def new_skill(self, json):
        response = {}
        s = self.jsonHelper.build_skill(json)
        try:
            self.session.add(s)
            self.session.flush()
            self.session.refresh(s)
            if json.get('template', None) == 'Alexa Flash Briefing':
                self.submit_feeds(json, s.SkillId)
            else:
                # Need to restructure to work with Intents
                self.submit_new_intents(json, s.SkillId)

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
    def get_skill_resps(self, Id,):
        Resps = []
        _ = self.session.query(Response).filter_by(SkillId=Id).all()
        for r in _:
            Resps.append(r.dict())

        return Resps

    # Function taht reutnrs a list of Utterance objects for a certain SkillId
    def get_skill_uttrs(self, Id):
        Utters = []
        _ = self.session.query(Utterances).filter_by(SkillId=Id).all()
        for u in _:
            Utters.append(u.dict())
        return Utters

    # Function that takes in a FULL SKILL JSON OBJECT and attempts to resubmit it to the database
    # Updates the skill and then replaces information for the Skills database dependencies
    # Sends error message upon issue editing the object
    def edit_skill(self, json):
        response = {}
        response['status'] = 'SUCCESS'
        if type(json) != dict:
            json = js.loads(json)
        try:
            q = self.session.query(Skills). filter_by(
                SkillId=json.get('SkillId')). one_or_none()
            if q:
                if json.get('template', None) == 'Alexa Flash Briefing':
                    q = self.update_skill(q, json)
                    self.replace_feeds(json, q.SkillId)
                    self.session.commit()
                else:
                    q = self.update_skill(q, json)
                    self.replace_intents(json, q.SkillId)
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

    def edit_profile(self, json):
        response = {}
        response['status'] = 'SUCCESS'
        if type(json) != dict:
            json = js.loads(json)
        try:

            profiles = self.session.query(User_Profile).filter_by(
                UserId=json.get('userId')).all()
            if profiles:
                profile = {}
                for p in profiles:
                    profile = p.dict()
                    self.session.delete(p)
                self.session.commit()
                up = User_Profile(
                    UserId=json.get('userId'),
                    Fname=json.get('firstName', profile['firstName']),
                    Lname=json.get('lastName', profile['lastName']),
                    Company=json.get('company', profile['company']),
                    Address=json.get('address', profile['address']),
                    Premise=json.get('premise', profile['premise']),
                    Country=json.get('country', profile['country']),
                    City=json.get('city', profile['city']),
                    State=json.get('state', profile['state']),
                    Zipcode=json.get('zipcode', profile['zipcode']),
                    Cell=json.get('cell', profile['cell'])
                )
                self.session.add(up)
                self.session.commit()
            else:
                response['status'] = 'FAIL'
        except Exception as e:
            print("Unexpected error at edit_skill: " + str(e))
            response['status'] = 'SERVER_ERROR'
            response['error'] = str(e)

        return response

    # Function that deletes all Utterances based on a SkillId
    # Submits new Utterances from JSON object
    def replace_uttrs(self, json, SkillId, OldIntentId, NewIntentId):
        try:
            _ = self.session.query(Utterances).filter_by(
                IntentId=OldIntentId).all()
            for x in _:
                self.session.delete(x)

            self.session.commit()
            self.submit_uttrs(json['intents'][0], SkillId, NewIntentId)

        except Exception as e:
            print('Unexpected error in replace_uttrs: ' + str(e))
        return

    # Function that deletes all Feeds based on a SkillId
    # Submits new Feeds from JSON object
    def replace_feeds(self, json, SkillId):
        try:
            _ = self.session.query(Feed).filter_by(SkillId=SkillId).all()
            for x in _:
                self.session.delete(x)
            self.session.commit()
            self.submit_feeds(json, SkillId)

        except Exception as e:
            print ('Unexpected error in replace_uttrs: ' + str(e))
        return

    # Function that deletes all Responses based on a SkillId
    # Submits new Responses from JSON object
    def replace_resps(self, json, SkillId, OldIntentId, NewIntentId):
        try:
            _ = self.session.query(Response).filter_by(
                IntentId=OldIntentId).all()
            for x in _:
                self.session.delete(x)
            self.session.commit()
            self.submit_resps(json['intents'][0], SkillId, NewIntentId)
        except Exception as e:
            print('Unexpected error in replace_resps: ' + str(e))
        return

    # TODO Needs to be able to work for multiple intents
    def replace_intents(self, json, SkillId):
        try:
            _ = self.session.query(Intent).filter_by(SkillId=SkillId).all()
            for x in _:
                id = x.IntentId
                self.session.delete(x)
                IntentId = self.submit_intent(json, SkillId)
                self.replace_resps(json, SkillId, id, IntentId)
                self.replace_uttrs(json, SkillId, id, IntentId)
        except Exception as e:
            print("Unexpected error in replace_intents: " + str(e))

    # Replaces a Skill DB objects attributes necessary for a Skill Edit
    # Returns the new Skill DB object
    def update_skill(self, Skill, json):
        Skill.Name = json.get('skillName')
        Skill.Status = json.get('status')
        Skill.Category = json.get('category')
        Skill.ShortDesc = json.get('shortDescription')
        Skill.LongDesc = json.get('longDescription')
        Skill.Keywords = str(json.get('keywords'))
        Skill.Template = json.get('template')
        Skill.Invoke = json.get('invocation')
        return Skill

    # creates a new intent, submits to the DB and then maps the responses and utterances to that intent
    # TODO Modify to allow for multiple intents
    def submit_new_intents(self, json, id):

        for intent in json['intents']:
            i = Intent(
                SkillId=id,
                Intent=intent.get('intent', 'default intent')
            )
            try:
                self.session.add(i)
                self.session.flush()
                self.session.refresh(i)

            except Exception as e:
                print('Unexpected error in submit_intent: ' + str(e))

            try:
                self.submit_uttrs(intent, id, i.IntentId)
                self.submit_resps(intent, id, i.IntentId)

            except Exception as e:
                print("Unexpencted error in submit_new_intents: " + str(e))

        return

    # Function that builds and submits a new intent
    # returns the new intents id
    def submit_intent(self, json, id):

        i = Intent(
            SkillId=id,
            Intent=json['intents'][0].get('intent', 'default intent')
        )
        try:
            self.session.add(i)
            self.session.flush()
            self.session.refresh(i)

        except Exception as e:
            print('Unexpected error in submit_intent: ' + str(e))

        return i.IntentId

    def get_skill_intent(self, id):
        intents = []
        _ = self.session.query(Intent).filter_by(SkillId=id).all()
        for intent in _:
            id = intent.IntentId
            intent = intent.dict()
            intent['utterances'] = self.get_skill_uttrs(id)
            intent['response'] = self.get_skill_resps(id)
            intents.append(intent)
        return intents

    def get_skill_feeds(self, id):
        feeds = []
        _ = self.session.query(Feed).filter_by(SkillId=id).all()
        for feed in _:
            feeds.append(feed.dict())

        return feeds

    # NOT IMPLEMENTED FULLY YET
    def submit_skill(self, json):

        response = {'status': "", 'resp': {}}


        # Update and submit skill from DB
        # self.edit_skill(json)
        # if json.get('firstName', 'Default') == 'Default' or json.get('lastName', 'Default') == 'Default':
        #     u = self.get_user_and_profile(Id=json.get('UserId', 0))
        #     json['firstName'] = u.Fname
        #     json['lastName'] = u.Lname

        resp = None
        if json['template'] == 'Alexa Flash Briefing':
            # Submit to service three
            resp = requests.post(
                config.local + ':5003/post', json=js.dumps(json))
        else:
            resp = requests.post(
                config.local + ':5001/post', json=js.dumps(json))

        resp = resp.json()
        print(resp)
        if 'amznSkillId' in resp['resp']:
            print('updating skill...')
            skill = self.session.query(Skills). filter_by(
                SkillId=json.get('skillId')). one_or_none()
            if skill:
                print(resp['resp']['amznSkillId'])
                skill.AMZ_SkillId = resp['resp']['amznSkillId']
                skill.Status = 'In development'
                self.session.commit()

        return resp

    def attempt_get_profile(self, json):
        email = ""
        users = self.session.query(User).filter_by(Id=json.get('userId')).all()
        if users:
            email = users[0].Email

        profiles = self.session.query(User_Profile).filter_by(
            UserId=json.get('userId')).all()
        if profiles:
            response = profiles[0].dict()
            response['email'] = email
            return response
        else:
            return {}

    def delete_skill(self, id, amznSkillId):
        response = {}
        q = self.session.query(Skills).filter_by(SkillId=id).one_or_none()
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

            self.session.commit()

            if str(amznSkillId) != '0':
                curr_dir = os.path.dirname(__file__)
                script_path = os.path.join(curr_dir, "./cli/delete_skill.sh")

                cmd = "sudo bash " + script_path + " " + amznSkillId
                process = subprocess.Popen(
                    cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

                # wait for the process to terminate
                out, err = process.communicate()
                errcode = process.returncode

                if err != "":
                    print("err")
                    print(type(err))
                    print(err)
                    return {'status': 'ASK_ERROR', 'resp': js.loads('\n'.join(err.splitlines()[2:]))}
                else:
                    print("out")
                    print(out)
                    return {'status': 'SUCCESS', 'resp': out}

        else:
            print("How did you get here")
            return {'status': "SKILL_NOT_FOUND"}
            # didnt exist so you cant delete it
            # how did you get here?

        # Returns number of rows affected, should be more than zero

        return {'status': "SUCCESS"}

    # updates a list of skills
    # updates AMZ_SkillId
    # updates Status
    def update_statuses(self,jsonData):
        resp = {}
        jsonData = js.loads(jsonData)

        updates = jsonData.get('updates',None)

        if updates:
            try:
                for skill in updates:
                    q = self.session.query(Skills).filter_by(SkillId = skill.get('SkillId')).one_or_none()
                    if q:
                        q.Status = skill.get('status')
                        q.AMZ_SkillId = skill.get('amznSkillId')
                self.session.commit()
            except Exception as e:
                resp['status'] = 'FAILURE'
                resp['error'] = str(e)
        else:
            print("Nothing to update")

        if resp.get('error', None) == None:
            resp['status'] = 'SUCCESS'

        return resp

    # Gets list of all skills where their Status is either 'Approved' or 'Denied'
    def get_unfinished_skills(self):

        # TODO update with actual status values for confirmed/denied
        q = self.session.query(Skills).filter(or_(Skills.Status != 'Approved', Skills.Status != 'Denied')).all()
        ids = []
        status = {}

        for skill in q:
            ids.append((skill.SkillId,skill.AMZ_SkillId))
<<<<<<< HEAD
        
        return ids

    # uses amznSkillId to update the status of skills
    def complex_status_update(self,jsonData):
        resp = {}
        jsonData = js.loads(jsonData)

        for skill in jsonData.get('updates'):
            try:
                q = self.session.query(Skills).filter_by(AMZ_SkillId = skill.get('amznSkillId')).one_or_none()
                if q:
                    q.Status = skill.get('status')
                else:
                    print("Skill Id does not exist in DB")
            except Exception as e:
                print(str(e))
                resp['error'] = str(e)
        self.session.commit()

        if resp.get('error',None) == None:
            resp['status'] = 'SUCCESS'
        else:
            resp['status'] = 'FAILURE'

        return resp
=======

        return ids
>>>>>>> 65ee5c3f7d3cdfe75bfa4f437c6df66a05b90e3a
