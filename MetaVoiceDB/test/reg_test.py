import json
import requests

data = {
    'Email' : 'test1@test.com',
    'Password' : 'test',
    'Fname' : 'test1',
    'Lname' : 'test1',
    'Company' : 'SomeCompany',
    'Address' : 'SomeAddress',
    'Premise' : 'SomePremise',
    'City' : 'Portland',
    'State' : 'Oregon',
    'Zipcode' : 97221,
    'Country' : 'USA',
    'Cell'  : '(123)-456-7890',
}

# Success Case, need to change data to make succeed
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/register',json=jsonData)
print('Success? ' + str(resp_succeed.json()))
