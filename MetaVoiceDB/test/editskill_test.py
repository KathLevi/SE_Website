import requests
import json

# Data formatting standards for a new skill request should look like either of these
FBdata = {
   "SkillId" : 7,
   "UserId" : 1,
   "template":"Alexa Flash Briefing",
   "Name":"Test Skill CHANGED",
   'Status' : 'ALMOST THERE',
   "Category":"Television MAYBE",
   "ShortDesc":"Descriptive words and HERE",
   "LongDesc":"Longer descriptive words and HERE",
   "Keywords":[
      "Key1",
      "Key69",
      "Key3"
   ],
   "Feeds":[
      {
         "Name":"Test Feed",
         "Preamble":"Pramble",
         "UpdateFreq":"Hourly",
         "Genre":"Headline News",
         "URL":"https://docs.google.com/document/d/1PAui9nkdnFX06YW1miJ_QVtn_x7IbrzTdoTbo1ajPeA/edit"
      },
      {
         "Name":"Test Feed",
         "Preamble":"Pramble",
         "UpdateFreq":"Hourly",
         "Genre":"Headline News",
         "URL":"https://docs.google.com/document/d/1PAui9nkdnFX06YW1miJ_QVtn_x7IbrzTdoTbo1ajPeA/edit"
      }
   ]
}

SSData = {
   "SkillId" : 3,
   "UserId" : 1,
   "Email":"Hello",
   "Template":"Alexa Flash Briefing",
   "firstName":"Andrew",
   "lastName":"Gazeley",
   "Name":"Test Skill Edited",
   "Category":"NIKE JUST DO IT",
   "ShortDesc":"Descriptive words here",
   "LongDesc":"Longer descriptive words",
   "Keywords":[
      "Key1",
      "Key2",
      "Key3"
   ],
    "Utterances":[
        "hello",
        "world"
    ],
    "Responses":[
        "Set",
        "Me",
        "Free"
    ]
}

jsonData = json.dumps(FBdata)
print("Data: " + jsonData)
resp_FB = requests.post('http://127.0.0.1:5004/editskill', json=jsonData)

jsonData = json.dumps(SSData)
print("Data : " + jsonData)
#resp_SS = requests.post('http://127.0.0.1:5004/editskill', json=jsonData)

print("Success? " + str(resp_FB))
#print("Success? " + str(resp_SS))