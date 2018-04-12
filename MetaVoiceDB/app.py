from flask import Flask, request
from src.Database import db
from src.Models import User, User_Profile
import json
import os


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def Index():
    return '<h1>Hello World</h1>'



if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5004.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)