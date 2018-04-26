import requests
import json

# Data formatting standards for a new skill request should look like either of these
FBdata = {
   "SkillId" : 28,
   "UserId" : 1,
   "Template":"Alexa Flash Briefing",
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
         "URL":"https://www.gm.com"
      },
      {
         "Name":"Test Feed",
         "Preamble":"Pramble",
         "UpdateFreq":"Hourly",
         "Genre":"Headline News",
         "URL":"https://www.reddit.com/r/nba"
      }
   ]
}

SSData = {
   "SkillId" : 29,
   "UserId" : 1,
   "Template":"Simple Skill",
    "Status" : 'Still works',
   "Name":"IT WORKED",
   "Category":"NIKE JUST DO IT",
   "ShortDesc":"Desc",
   "LongDesc":"Long",
   "Keywords":[
      "Key1",
      "Key2",
      "Key3"
   ],
    "Utterances":[
        "IT WORKED1",
        "You sure about that ANdrew?"
    ],
    "Responses":[
        "How about now?",
        "WORKDED4",
        "Maybe Now?"
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