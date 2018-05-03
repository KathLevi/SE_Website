import json
import requests

data = {
    'email' : 'andrew@test.com',
    'password' : 'test',
    'firstName' : 'test1',
    'lastName' : 'test1',
    'company' : 'SomeCompany',
    'address' : 'SomeAddress',
    'premise' : 'SomePremise',
    'city' : 'Portland',
    'state' : 'Oregon',
    'zipcode' : 97221,
    'country' : 'USA',
    'cell'  : '(123)-456-7890',
}

# Success Case, need to change data to make succeed
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/register',json=jsonData)
print('Success? ' + str(resp_succeed.json()))
