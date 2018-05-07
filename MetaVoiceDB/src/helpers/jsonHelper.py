import json
import datetime
from src.Models import User, User_Profile, Feed, Utterances, Response, Skills

class jsonHelper:
    def __init__(self):
        return

    def flashBriefToJson(self,skill,feeds):
        jsonData = {}
        jsonData = self.skilltoFormat(skill)
        jsonData['feeds'] = []
        for feed in feeds:
            feed = self.feedToFormat(feed)
            jsonData['feeds'].append(feed)

        return json.dumps(jsonData)

    def simpleSkillToJson(self,skill,intent,response,utterances):
        jsonData = {}
        jsonData = self.skilltoFormat(skill)
        jsonData['intents'] = []
        jsonData['intents'].append(self.intentToFormat(intent,response,utterances))
        return json.dumps(jsonData)

    def intentToFormat(self,intent,response,utterances):
        jsonData = {
            'intent' : intent.Intent,
            'utterances' : {},
            'response' : response.resp,
        }
        i = 1
        for utter in utterances:
            jsonData['utterances'][str(i)] = utter.Utter
            i = i + 1

        return jsonData

    def feedToFormat(self,feed):
        jsonData = {
            'name' : feed.Name,
            'preamble' : feed.Preamble,
            'updateFrequency' : feed.UpdateFreq,
            'genre' : feed.Genre,
            'url' : feed.URL
        }
        return jsonData

    def skilltoFormat(self,skill):
        jsonData = {
            'userId' : skill.UserId,
            'skillName' : skill.Name,
            'invocationName' : skill.Invoke,
            'category' : skill.Category,
            'shortDescription' : skill.ShortDesc,
            'longDescription' : skill.LongDesc,
            'keywords' : skill.Keywords,
            'template' : skill.Template,
        }

        return jsonData

    # Builds a new Feed Object with on SkillID, from JSON
    def build_feed(self, feed, SkillId):
        try:
            f = Feed(
            Name = feed.get('name', 'Default') ,
            SkillId = SkillId ,
            Preamble= feed.get('preamble', 'Default') ,
            UpdateFreq= feed.get('updateFrequency', 'Default') ,
            Genre = feed.get('genre', 'Default') ,
            URL = feed.get('url', 'Default')
        )
            return f
        except Exception as e:
            print("Unexpected error at build_feed: " + str(e))
        return "SERVER_ERROR"

    # Builds a new User object from JSON
    def build_user ( self , json ):
        u = User(
            Email=json[ 'email' ] ,
            Password=json[ 'password' ] ,
            IsAdmin=0)
        up = User_Profile (
                Fname=json.get('firstName', 'Default') ,
                Lname=json.get('lastName', 'Default'),
                Company=json.get('company', 'Default') ,
                Address=json.get('address', 'Default') ,
                Premise=json.get('premise', 'Default') ,
                Country=json.get('country', 'Default') ,
                City=json.get('city', 'Default') ,
                State=json.get('state', 'Default') ,
                Zipcode=json.get('zipcode', 99999) ,
                Cell=json.get('cell', 'Default')
            )
        u.User_Profile = up
        return u

    # Builds a new Utterance object on a SkillId from JSON
    def build_utter(self,ut, SkillId,IntentId):
        return Utterances(
            SkillId = SkillId,
            IntentId = IntentId,
            Utter = ut
        )

    # Builds a new Response object on a SkillId from JSON
    def build_resp(self,resp, SkillId, IntentId):
        return Response(
            SkillId=SkillId,
            IntentId=IntentId,
            Resp=resp
        )

    # Builds a new Skill Object from JSON
    def build_skill(self,json):
        Keywords = json.get('keywords', 'Default')
        now = datetime.datetime.now()
        return Skills(
            UserId=json.get("userId",0) ,
            Name=json.get("skillName","Default Name"),
            AMZ_SkillId= json.get('amz_SkillId','Default') ,
            Status=json.get('status', 'In Development') ,
            Category=json.get('category','Default') ,
            ShortDesc=json.get('shortDescription', 'Default'),
            LongDesc=json.get('longDescription', 'Default') ,
            Keywords= str(Keywords),
            Template=json.get('template','Simple Skill'),
            SkillId=json.get('SkillId', None),
            Invoke=json.get('invocationName','Default Invoke'),
            CreationDate=now.__str__()
        )
