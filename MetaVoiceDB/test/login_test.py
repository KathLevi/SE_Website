import requests
import json

data = {
    'Email' : 'Hello',
    'Password' : 'World',
    'Fname' : 'Andrew',
    'Lname' : 'Gazeley',
    'Id' : None
}

# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/login',json=jsonData)

# Failure Test Case
# data['username'] = 'test'
# data['password'] = 'test'
# jsonData = json.dumps(data)
# resp_fail = requests.post('http://127.0.0.1:5004/login',json=jsonData)

print('Success? ' + str(resp_succeed.json()))
# print('Failure? ' + str(resp_fail.json()))