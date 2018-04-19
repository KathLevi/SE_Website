import requests
import json

# Data formatting standards for a new skill request should look like either of these
FBdata = {
   "UserId" : 1,
   "email":"Hello",
   "template":"Alexa Flash Briefing",
   "firstName":"Andrew",
   "lastName":"Gazeley",
   "Name":"Test Skill",
   "Category":"Business & Finance",
   "ShortDesc":"Descriptive words here",
   "LongDesc":"Longer descriptive words",
   "Keywords":[  
      "Key1",
      "Key2",
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
   "UserId" : 1,  
   "Email":"Hello",
   "Template":"Alexa Flash Briefing",
   "firstName":"Andrew",
   "lastName":"Gazeley",
   "Name":"Test Skill",
   "Category":"Business & Finance",
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
        "Sun",
        "Moon",
        "Stars"
    ]
}

#jsonData = json.dumps(FBdata)
#print("Data: " + jsonData)
#resp_FB = requests.post('http://127.0.0.1:5004/newskill')

jsonData = json.dumps(SSData)
print("Data : " + jsonData)
resp_SS = requests.post('http://127.0.0.1:5004/newskill', json=jsonData)

#print("Success? " + str(resp_FB))
print("Success? " + str(resp_SS))