from flask import Flask
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from falsk_cors import CORS

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    mongo_uri = os.getenv('MONGO_URI')
    # Create a new client and connect to the server
    client = MongoClient(uri=mongo_uri, server_api=ServerApi('1'))
    
    with app.app_context():
        # Import routes here to avoid circular imports
        from app.routes import hello

    return app
