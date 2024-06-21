from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
# from flask_cors import CORS

# Here we load environment variables from .env file
load_dotenv()

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    # Here we initialize MongoDB connection
    mongo_uri = os.getenv('MONGO_URI')
    mongo.init_app(app, uri=mongo_uri)
    
    with app.app_context():
        # Import routes here to avoid circular imports
        # Import and register blueprints
        from app.routes.hello import hello_bp
        app.register_blueprint(hello_bp)

    return app
