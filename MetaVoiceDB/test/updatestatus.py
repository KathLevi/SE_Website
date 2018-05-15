import json
import requests

u1 = {
    'SkillId'  : 77,
    'status' : 'In Development',
    'amznSkillId' : 'amzn1.ask.skill.12345678-1234-1234-123456789123'
}

u2 = {
    'SkillId'  : 78,
    'status' : 'Approved',
    'amznSkillId' : 'amzn1.ask.skill.897213879-1234-1234-123456789123'
}

u3 = {
    'SkillId'  : 79,
    'status' : 'Denied',
    'amznSkillId' : 'amzn1.ask.skill.47371737-1234-1234-123456789123'
}
data = {
    'updates' : [u1,u2,u3]
}



# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/updatestatus',json=jsonData)
print('Success? ' + str(resp_succeed.json()))