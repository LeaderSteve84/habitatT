import os
from dotenv import load_dotenv

# Load environmental variables from .env file
load_dotenv()


class Config:
    FLASK_RUN = os.environ.get('FLASK_APP')
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MONGO_URI = os.environ.get('MONGO_URI')
