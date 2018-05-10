import requests
import json

# 148,158

data = {
    'SkillId' : 158
}

# Success Case, need to change data to make succeed
jsonData = json.dumps(data)
print('Data: ' + jsonData)
resp_succeed = requests.post('http://127.0.0.1:5004/deleteskill',json=jsonData)
print('Success? ' + str(resp_succeed.json()))
