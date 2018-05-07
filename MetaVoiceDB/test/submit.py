import requests
import json

jsonData_SS = {
    #added fields
   "lastName" : 'LNAME',
   "firstName" : 'FNAME',

   "UserId" : 1,
   "template": "Alexa Interaction",
    #changed
   "skillName":"Test Simple Skill",
   "category":"Wooden Ship Sailing",
   "shortDescription":"Descriptive words here",
   "longDescription":"Longer descriptive words",
   "keywords": "Keword1, Hellp, Help",
   "intents" : [
       {
        # These should be able to be modified for a many to many approach
        "intent" : "My Intent",
        "utterances":{
           1 : "hello",
           2 : "world",
           3 : "My",
           4 : "Name",
           5 : "Is Sam"
        },
        "response": "Response?"
       }
   ]
}
jsonData_F = {
    #added fields
   "lastName" : 'LNAME',
   "firstName" : 'FNAME',

   "UserId" : 1,
   "template": "Alexa Flash Briefing",
    #changed
   "skillName":"Test Simple Skill",
   "category":"Wooden Ship Sailing",
   "shortDescription":"Descriptive words here",
   "longDescription":"Longer descriptive words",
   "keywords": "Keword1, Hellp, Help",
   "feeds" : [
    	{
    	"name" : "Feed Me",
    	"preamble" : "PRAMBDLELESDSD",
    	"updateFrequency" : "Weekly",
    	"genre" : "Fun stuff",
    	"url" : "www.google.com"
    	}
        ],
}

#jsonData = json.dumps(jsonData_SS)
#print("Data: " + jsonData)
#resp = requests.post('http://127.0.0.1:5004/submit', json=jsonData)
#print("Success? " + str(resp))

jsonData = json.dumps(jsonData_F)
print("Data: " + jsonData)
resp = requests.post('http://127.0.0.1:5004/submit', json=jsonData)
print("Success? " + str(resp))

