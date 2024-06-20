#!/usr/bin/env python3
"""modules that defines my routes"""
from app import app


@app.route('/hello/', methods=['GET'], strict_slashes=False)
def hello_route():
	return "hello, world!"
    
