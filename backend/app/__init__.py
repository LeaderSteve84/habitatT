#!/usr/bin/env python3
"""app package init"""

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from app.config import Config


# Function to initialize MongoDB client
def init_mongo_client(connection_string: str) -> MongoClient:
    try:
        client = MongoClient(connection_string)
        print("MongoDB client initialized successfully.")
        return client
    except errors.ConnectionError as e:
        print(f"Error connecting to MongoDB: {e}")
        raise

# Mongo client initialization
CONNECTION_STRING = Config.MONGO_URI
mongo_client: MongoClient = init_mongo_client(CONNECTION_STRING)

# Select database and collection from Atlas
database: Database = mongo_client.get_database("habitatTdb")
tenantsCollection: Collection = database.get_collection("tenants")

def create_app():
    """return flask application"""
    app = Flask(__name__)

    # Load configuration from app.config
    app.config.from_object(Config)
    
    # Enable CORS for all domains on all routes
    CORS(app)

    with app.app_context():
        # Import routes here to avoid circular imports
        from app.routes import bp

        # register blueprints
        app.register_blueprint(bp)

    return app
