import requests
import json

# Success Test Case
resp_succeed = requests.post('http://127.0.0.1:5004/getunfinishedskills')
print('Success? ' + str(resp_succeed.json()))