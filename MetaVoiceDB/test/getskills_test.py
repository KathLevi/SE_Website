import requests
import json

data = {
    'UserId' : 2
}

# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/viewskills',json=jsonData)

print('Success? ' + str(resp_succeed.json()))