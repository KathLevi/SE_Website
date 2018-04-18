from flask import Flask, request
from flask_cors import CORS
from src.Database import db
from src.Models import User, User_Profile
import json
import os

app = Flask(__name__)
CORS(app)

cs = "mysql://apeacock18:Pirate21@" \
     "bluemarble-db.cjpojclzuwqy.us-east-1.rds.amazonaws.com" \
     "/BlueMarbleDB"

# generates 200 response and packeges dictionary into json to send
def good_response(resp):
    response = app.response_class ( response=json.dumps ( resp ) ,
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
    UserId = json.loads(request.get_json())['UserId']
    print("Requesting Skills for User")
    _db = db(cs)
    status = db.attempt_get_skills(limit=None)
    _db.shutdown()
    return good_response(status)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5004.
    port = int(os.environ.get('PORT', 5004))
    app.run(host='0.0.0.0', port=port, debug=True)
