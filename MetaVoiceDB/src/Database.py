from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.Models import User , User_Profile , Base


class db:
    def __init__ ( self , conn_string=None ):
        self.conn_string = conn_string
        self.engine = create_engine ( conn_string , convert_unicode=True )

        Base.metadata.create_all ( bind=self.engine )
        Session = sessionmaker ( bind=self.engine )
        self.session = Session ( )
        return

    def __str__ ( self ):
        return "Database(%r)" % (self.conn_string)

    def attempt_login ( self , json ):
        status = {}
        try:
            q = self.get_user_and_profile ( Email=json[ 'Email' ] , Password=json[ 'Password' ] )
            if q:
                # need to get user_profile for user
                print ( 'One match' )
                status[ 'UserId' ] = q.Id
                status[ 'Email' ] = q.Email
                status[ 'Fname' ] = q.User_Profile.Fname
                status[ 'Lname' ] = q.User_Profile.Lname
                status[ 'Company' ] = q.User_Profile.Company
                status[ 'State' ] = q.User_Profile.State
                status[ 'Cell' ] = q.User_Profile.Cell
            else:
                status[ 'login' ] = 0
        except Exception as e:
            print ( e )
            status[ 'error' ] = str ( e )
        return status

    def attempt_register ( self , json ):
        status = {}

        q = self.session.query ( User ).\
            filter_by( Email = json[ 'Email' ] ).\
            one_or_none ( )

        if q:
            status[ 'register' ] = 0
            print("Failed to Register " + q.Email)
        else:
            try:
                self.session.add ( self.build_user ( json ) )
                self.session.commit ( )
                q = self.get_user_and_profile ( json[ 'Email' ] , json[ 'Password' ] )
                print ( "Registered: " + q.Email )

                status[ 'UserId' ] = q.Id
                status[ 'Email' ] = q.Email
                status[ 'Fname' ] = q.User_Profile.Fname
                status[ 'Lname' ] = q.User_Profile.Lname
                status[ 'Company' ] = q.User_Profile.Company
                status[ 'State' ] = q.User_Profile.State
                status[ 'Cell' ] = q.User_Profile.Cell
            except Exception as e:
                print(e)
                status['error'] = str(e)

        return status

    def build_user ( self , json ):
        u = User(
            Email=json[ 'Email' ] ,
            Password=json[ 'Password' ] ,
            IsAdmin=0)
        up = User_Profile (
                Fname=json[ 'Fname' ] ,
                Lname=json[ 'Lname' ] ,
                Company=json[ 'Company' ] ,
                Address=json[ 'Address' ] ,
                Premise=json[ 'Premise' ] ,
                Country=json[ 'Country' ] ,
                City=json[ 'City' ] ,
                State=json[ 'State' ] ,
                Zipcode=json[ 'Zipcode' ] ,
                Cell=json[ 'Cell' ]
            )
        u.User_Profile = up
        return u

    def get_user_and_profile ( self , Email , Password ):
        q = self.session.query ( User ).\
            join ( User_Profile ).\
            filter ( User.Id == User_Profile.UserId ).\
            filter ( User.Email == Email ).\
            filter ( User.Password == Password ).\
            one_or_none ( )
        return q

    def shutdown ( self ):
        return self.engine.dispose ( )
