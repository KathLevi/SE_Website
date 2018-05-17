from flask import Flask, request, jsonify
from flask_cors import CORS
from src.Database import db
from src.Config import Config
import json as js
import os
import requests


config = Config()
app = Flask(__name__)
CORS(app)

cs = "mysql://apeacock18:Pirate21@" \
     "bluemarble-db.cjpojclzuwqy.us-east-1.rds.amazonaws.com" \
     "/BlueMarbleDB"

# generates 200 response and packeges dictionary into json to send
def good_response(resp):
    response = app.response_class ( response=js.dumps ( resp, default=str ) ,
                                    status=200 ,
                                    mimetype='application/json' )
    return response

@app.route ( '/test' , methods=[ 'GET' ] )
def Index ():
    return '<h1>Hello World</h1>'

@app.route ( '/login' , methods=[ 'POST' ] )
def Login ():
    jsonData = request.get_json()
    print ( "Login Request" )
    _db = db(cs)
    resp = _db.attempt_login ( json=jsonData )
    _db.shutdown()
    return good_response(resp)

@app.route('/register', methods=['POST'])
def Register():
    jsonData = request.get_json()
    print("Register Request")
    _db = db(cs)
    resp = _db.attempt_register(jsonData)
    _db.shutdown()
    return good_response(resp)

@app.route('/viewskills', methods=['POST'])
def ViewSkills():
    json = request.get_json()
    UserId = json['UserId']
    print("Requesting Skills for User")
    _db = db(cs)
    resp = _db.attempt_get_skills(UserId=UserId,limit=None)
    _db.shutdown()
    print("returning view skill response")
    return good_response(resp)

@app.route('/getskill', methods=['POST'])
def GetSkill():
    json = request.get_json()
    SkillId = json['SkillId']
    print("Retrieving skill")
    _db = db(cs)
    resp = _db.get_skill(SkillId=SkillId)
    _db.shutdown()
    print("returning get skill response")
    return good_response(resp)

@app.route('/newskill', methods=['POST'])
def NewSkill():
    jsonData = request.get_json()
    print("New Skill Submission")
    _db = db(cs)
    resp = _db.new_skill(jsonData)
    _db.shutdown()
    return good_response(resp)

@app.route('/editskill', methods=['POST'])
def EditSkill():
    jsonData =request.get_json()
    print('Edit skill request')
    _db = db(cs)
    status = _db.edit_skill(jsonData)
    _db.shutdown()
    return good_response(status)

@app.route('/editprofile', methods=['POST'])
def EditProfile():
    jsonData = request.get_json()
    print('Edit profile request')
    _db = db(cs)
    status = _db.edit_profile(jsonData)
    _db.shutdown()
    return good_response(status)

@app.route('/submit', methods=['POST'])
def SubmitSkill():
    jsonData = request.get_json()
    print('Skill Submission Request')
    _db = db(cs)
    resp = _db.submit_skill(jsonData)
    _db.shutdown()

    # Post skill to be submitteds data to Service1 MetaVoiceLambda
    # change config to 'aws' when testing on aws ec2

    return jsonify(resp)

@app.route('/getprofile', methods=['POST'])
def GetProfile():
    jsonData = request.get_json()
    print("Getting Profile")
    _db = db(cs)
    resp = _db.attempt_get_profile(jsonData)
    _db.shutdown()
    return good_response(resp)

@app.route('/deleteskill', methods=['POST'])
def DeleteSkill():
    jsonData = request.get_json()
    id = jsonData['SkillId']

    print("Deleting Skill")
    _db = db(cs)
    resp = _db.delete_skill(id, jsonData['amznSkillId'])
    return jsonify(resp)

@app.route('/updatestatus', methods=['POST'])
def UpdateStatus():
    jsonData = request.get_json()

    print("Updating Skills Status'")
    _db = db(cs)
    resp = _db.update_statuses(jsonData)

    return good_response(resp)
@app.route('/complexstatusupdate',methods=['POST'])
def ComplexStatusUpdate()
    jsonData = request.get_json()
    print("Updating status' on amznSkillId")
    _db = db(cs)
    resp = _db.complex_status_update(jsonData)
    
    return good_response(resp)
@app.route('/getunfinishedskills', methods=['POST'])
def GetUnfinishedSkills():
    print('Getting unfinished skills')
    _db = db(cs)
    resp = _db.get_unfinished_skills()

    return good_response(resp)


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5004.
    port = int(os.environ.get('PORT', 5004))
    app.run(host='0.0.0.0', port=port, debug=True, threaded=True)
