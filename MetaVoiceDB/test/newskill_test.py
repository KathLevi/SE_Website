import requests
import json

# Data formatting standards for a new skill request should look like either of these
FBdata = {
   "firstName" : 'Name',
   "lastName" : "Name2",
   "UserId" : 3,
   "template":"Alexa Flash Briefing",
   'amz_SkillId' : 'DOES IT HAVE AN ID?',
   "name":"Test News Skill",
   "category":"Test Skills",
   "shortDescription":"App to make sandwich",
   "longDescription":"Longer desc of sandwiches",
   "keywords": "Sandwich, cheese, mayo",
   "feeds":[  
      {  
         "name":"Feed1",
         "preamble":"Pramble",
         "updateFrequency":"Hourly",
         "genre":"News",
         "url":"https://www.google.com"
      },
      {  
         "name":"Feed2",
         "preamble":"Pramble",
         "updateFrequency":"Hourly",
         "genre":"News",
         "url":"https://www.duckduckgo.com"
      }
   ]
}

SSData = {
   "UserId" : 1,
   "template":"Simple Skill",
   "name":"Test Simple Skill",
   "category":"Wooden Ship Sailing",
   "shortDescription":"Descriptive words here",
   "longDescription":"Longer descriptive words",
   "keywords": "Keword1, Hellp, Help",
   "intents" : [
       {
        # These should be able to be modified for a many to many approach
        "intent" : "My Intent",
        "utterances":{  
           '1' : "hello",
           '2' : "world",
           '3' : "My",
           '4' : "Name",
           '5' : "Is Sam"
        },
        "response": "Response?"
       }
   ]
}

jsonData = json.dumps(FBdata)
print("Data: " + jsonData)
resp_FB = requests.post('http://127.0.0.1:5004/newskill', json=jsonData)

jsonData = json.dumps(SSData)
print("Data : " + jsonData)
resp_SS = requests.post('http://127.0.0.1:5004/newskill', json=jsonData)

print("Success? " + str(resp_FB))
print("Success? " + str(resp_SS))