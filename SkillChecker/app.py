from apscheduler.schedulers.background import BackgroundScheduler
import time
import datetime
import os
import subprocess
import requests
from .src.check import *

def check():
    print("Starting Job")
    print(str(datetime.datetime.now()))
    
    jsonData = apiListSkills()
    jsonData = createUpdateJSON(jsonData)
    
    try:
        resp = requests.post('/complexstatusupdate',json=jsonData)    
    except Exception as e:
        print(str(e))

    return

# http://apscheduler.readthedocs.io/en/latest/index.html
scheduler = BackgroundScheduler()
job = scheduler.add_job(check,'interval',minutes=2)

if __name__ == '__main__':
    scheduler.start()
    
    # found here
    # https://stackoverflow.com/questions/29223222/how-do-i-schedule-an-interval-job-with-apscheduler
    print ( 'Press Ctrl+{0} to exit'.format ( 'Break' if os.name == 'nt' else 'C' ) )
    try:
        # This is here to simulate application activity (which keeps the main thread alive).
        while True:
            time.sleep ( 5 )
    except (KeyboardInterrupt , SystemExit):
        # Not strictly necessary if daemonic mode is enabled but should be done if possible
        scheduler.shutdown ( )