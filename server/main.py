from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from sqlalchemy import Column, Integer, Text


app = Flask(__name__, static_url_path='')
db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///angulask.db'


class Eel(db.Model):
    id = Column(Integer, primary_key=True)
    name = (Column(Text, unique=False))


db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Eel, methods=['GET', 'POST', 'DELETE', 'PUT'])


@app.route('/')
def index():
    return app.send_static_file("index.html")

app.Debug = True

if __name__ == '__main__':
    app.run()
