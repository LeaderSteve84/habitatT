#!/usr/bin/env python3
"""app package init"""

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient, errors
from pymongo.collection import Collection
from pymongo.database import Database
from app.config import Config
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager
import logging

# Initialize mail instance globally
mail = Mail()
revoked_tokens = set()  # Set to store revoked JWT tokens

# Function to initialize MongoDB client
def init_mongo_client(connection_string: str) -> MongoClient:
    try:
        client = MongoClient(connection_string)
        print("MongoDB client initialized successfully.")
        return client
    except errors.ConnectionFailure as e:
        print(f"Error connecting to MongoDB: {e}")
        raise
    except errors.ConfigurationError as e:
        print(f"Configuration error: {e}")
        raise

# Mongo client initialization
CONNECTION_STRING = Config.MONGO_URI

try:
    mongo_client: MongoClient = init_mongo_client(CONNECTION_STRING)
    # Select database and collection from Atlas
    database: Database = mongo_client.get_database("habitatTdb")
    tenantsCollection: Collection = database.get_collection("tenantsTest")
    adminMessagesCollection: Collection = database.get_collection("adminMessages")
    propertiesCollection: Collection = database.get_collection("properties")
    listingCollection: Collection = database.get_collection("listing")
    logRequestsCollection: Collection = database.get_collection("logRequests")
    adminsCollection: Collection = database.get_collection("admins")
    documentsCollection: Collection = database.get_collection("documents") 
except (errors.ConnectionFailure, errors.ConfigurationError) as e:
    mongo_client = None
    database = None
    tenantsCollection = None
    adminMessagesCollection = None
    propertiesCollection = None
    listingCollection = None
    logRequestsCollection = None
    adminsCollection = None
    print(f"Database initialization failed: {e}")

def create_app():
    """return flask application"""
    app = Flask(__name__)
    
    # Load configuration from app.config
    app.config.from_object(Config)
    mail.init_app(app)
    jwt = JWTManager(app)

    # Enable CORS for all domains on all routes
    CORS(app)
    
    # Configure logging
    if not app.debug:
        app.logger.setLevel(logging.DEBUG)
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        stream_handler.setFormatter(formatter)
        app.logger.addHandler(stream_handler)

    # JWT blocklist loader function
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload):
        jti = jwt_payload['jti']
        return jti in revoked_tokens

    with app.app_context():
        # Import routes here to avoid circular imports
        from app.routes import bp

        # Register blueprints
        app.register_blueprint(bp)

    return app
