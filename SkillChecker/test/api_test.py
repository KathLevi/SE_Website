import subprocess
import json


def apiListSkills():
    output = subprocess.check_output(args=['ask','api','list-skills'],shell=True)
    return output.decode()

out = apiListSkills()
out = json.loads(out)

for skill in out['skills']:
    print(skill['skillId'])
    print(skill['publicationStatus'])

