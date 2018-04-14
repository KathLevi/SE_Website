from flask import Flask, request
from src.Database import db
from src.Models import User, User_Profile
import json

app = Flask(__name__)

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
    session = db ( cs ).session
    session.add ( User ( Username='Hello' , Password='World' , IsAdmin=False ) )
    session.commit ( )

    return '<h1>Hello World</h1>'

@app.route ( '/Login' , methods=[ 'POST' ] )
def Login ():
    jsonData = json.loads ( request.get_json ( ) )
    print ( "Login Request: " + jsonData[ 'Email' ] )
    _db = db(cs)
    status = _db.attempt_login ( json=jsonData )
    _db.shutdown()
    return good_response(status)

@app.route('/Register', methods=['POST'])
def Register():
    jsonData = json.loads(request.get_json())
    print("Register Request: " + jsonData['Email'])
    _db = db(cs)
    status = _db.attempt_register(jsonData)
    _db.shutdown()
    return good_response(status)

@app.route('/ViewSkills', methods=['POST'])
def ViewSkills():
    UserId = json.loads(request.get_json())['UserId']
    print("Requesting Skills for User ID: " + str(UserId))
    _db = db(cs)
    status = _db.attempt_get_skills(UserId)
    _db.shutdown()
    return good_response(status)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5004.
    # port = int(os.environ.get('PORT', 5000))
    port = 5004
    app.run(host='0.0.0.0', port=port)