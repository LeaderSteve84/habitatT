import os
from flask import Flask
from dotenv import load_dotenv

# load environment variable from .env file
load_dotenv()

app = Flask(__name__)

from app.routes import hello
