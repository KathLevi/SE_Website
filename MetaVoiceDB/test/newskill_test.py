import requests
import json

# Data formatting standards for a new skill request should look like either of these
FBdata = {
   "UserId" : 3,
   "Template":"Alexa Flash Briefing",
   'AMZ_SkillId' : 'DOES IT HAVE AN ID?',
   "Name":"Test News Skill",
   "Category":"Test Skills",
   "ShortDesc":"App to make sandwich",
   "LongDesc":"Longer desc of sandwiches",
   "Keywords":[  
      "Sandwich",
      "cheese",
      "mayo"
   ],
   "Feeds":[  
      {  
         "Name":"Feed1",
         "Preamble":"Pramble",
         "UpdateFreq":"Hourly",
         "Genre":"News",
         "URL":"https://www.google.com"
      },
      {  
         "Name":"Feed2",
         "Preamble":"Pramble",
         "UpdateFreq":"Hourly",
         "Genre":"News",
         "URL":"https://www.duckduckgo.com"
      }
   ]
}

SSData = {
   "UserId" : 1,
   "Template":"Simple Skill",
   "Name":"Test Simple Skill",
   "Category":"Wooden Ship Sailing",
   "ShortDesc":"Descriptive words here",
   "LongDesc":"Longer descriptive words",
   "Keywords":[  
      "Keword1",
      "Hellp",
      "Help"
   ],
    "Utterances":[  
        "hello",
        "world",
        "My",
        "Name",
        "Is Sam"
    ],
    "Responses":[  
        "Him",
        "Me",
        "You"
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