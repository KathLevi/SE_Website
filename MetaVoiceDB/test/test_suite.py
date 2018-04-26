import unittest
import os
import json
import requests

class FlaskrTestCase(unittest.TestCase):

    def set_up(self):
        return

    def tear_down(self):
        return

    def login(self,e,p):
        user = {
            'Email' : e,
            'Password' : p
        }
        jsonData = json.dumps ( user )
        resp = requests.post ( 'http://127.0.0.1:5004/login' , json=jsonData )
        return resp.json()


    def logout(self,uid):
        return

    def get_skills(self,uid):
        return

    def new_skill(self,skill):
        return

    def register(self,user):
        return

    def test_login(self):
        assert 'SUCCESS' in self.login('test@test.com','test')['status']
        assert 'INVALID_LOGIN' in self.login('asdasdddsa','asdsaddas')['status']
        return

if __name__ == '__main__':
    unittest.main()