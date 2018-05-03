import requests
import json

# Data formatting standards for a edit skill request should look like either of these
FBdata = {
   "firstName" : 'Name',
   "lastName" : "Name2",
   "SkillId" : 80,
   "UserId" : 99,
   "template":"Alexa Flash Briefing",
   'amz_SkillId' : 'jiasdlkjdsakjldsakj',
   "name":"Test News Skill CHANGED",
   "category":"Test Skills NEWCAT",
   "shortDescription":"App to make sandwich",
   "longDescription":"Longer desc of sandwiches",
   "keywords": "Sandwich, cheese, mayo",
   "status" : 'GREEN MEANS GO',
   "amz_SkillId" : "hasdhjasdjkhk123123",
   "feeds":[  
      {  
         "name":"Feed1 TEST",
         "preamble":"Pramble",
         "updateFrequency":"Weekly",
         "genre":"News",
         "url":"https://www.AboveandBeyond.nu"
      },
      {  
         "name":"Feed2 TEST",
         "preamble":"Pramble",
         "updateFrequency":"Hourly",
         "genre":"News",
         "url":"https://www.gm.com"
      }
   ]
}

SSData = {
   "UserId" : 0,
   "SkillId" : 81,
   "template":"Simple Skill",
   "name":"Test Simple Skill CHANGED",
   "category":"Metal Ship Sailing",
   "shortDescription":"Descriptive words here - CHANGED",
   "longDescription":"Longer descriptive words - CHANGED",
   "keywords": "Keword1, Hellp, Help, NEWKEYWORD",
   "status" : "HELLO WORLD I AM HERE",
   'amz_SkillId' : "jhsadkjlhsdakjl--sadk212",
   "intents" : [
       {
        # These should be able to be modified for a many to many approach
        "intent" : "My Intent Changed",
        "utterances":{  
           '1' : "Hello",
           '2' : "world",
           '3' : "My",
           '4' : "Crean",
           '5' : "Peaches"
        },
        "response": "Response!"
       }
   ]
}

jsonData = json.dumps(FBdata)
print("Data: " + jsonData)
resp_FB = requests.post('http://127.0.0.1:5004/editskill', json=jsonData)

jsonData = json.dumps(SSData)
print("Data : " + jsonData)
resp_SS = requests.post('http://127.0.0.1:5004/editskill', json=jsonData)

print("Success? " + str(resp_FB))
print("Success? " + str(resp_SS))