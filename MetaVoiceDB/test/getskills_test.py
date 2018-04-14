import requests
import json

data = {
    'UserId' : 1
}

# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/ViewSkills',json=jsonData)

print('Success? ' + str(resp_succeed.json()))