#!/usr/bin/env python3
"""modules that defines my routes"""
# from app import create_app
from flask import Blueprint

hello_bp = Blueprint('hello', __name__)

# app = create_app()


# @app.route('/hello/', methods=['GET'], strict_slashes=False)
@hello_bp.route('/hello/', methods=['GET'], strict_slashes=False)
def hello_route():
	return "hello, world!"
    
