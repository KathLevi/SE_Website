import subprocess
import json

@staticmethod
def apiListSkills():
    output = subprocess.check_output(args=['ask','api','list-skills'],shell=True)
    return output.decode()

@staticmethod
def createUpdateJSON(jsonData):
    out = json.loads(jsonData)

    update = {
        'updates' : []
    }
    for skill in jsonData['skills']:
        print(skill['skillId'])
        print(skill['publicationStatus'])

        update['updates'].append({
            'amznSkillId' : skill['skillId'],
            'status' : skill['publicationStatus']
        })

    return json.dumps(update)