from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class db:
    def __init__(self, conn_string=None):
        self.conn_string = conn_string
        self.engine = create_engine(conn_string, convert_unicode=True)
        
        Base.metadata.create_all(bind = self.engine)
        Session = sessionmaker(bind = self.engine)
        self.session = Session()
        return 

        