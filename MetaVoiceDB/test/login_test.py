import requests
import json

data = {
    'email' : 'Hello',
    'password' : 'World',
    'Fname' : 'Andrew',
    'Lname' : 'Gazeley'
}

# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/login',json=jsonData)
print('Success? ' + str(resp_succeed.json()))
