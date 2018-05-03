import requests
import json
import pprint

pp = pprint.PrettyPrinter(indent=2)
data = {
    'UserId' : 10
}

# Success Test Case
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/viewskills',json=jsonData)

pp.pprint(resp_succeed.json())