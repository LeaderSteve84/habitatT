#!/usr/bin/env python3
"""modules that defines hello route"""
from flask import Blueprint

hello_bp = Blueprint('hello', __name__)


@hello_bp.route('/hello/', methods=['GET'], strict_slashes=False)
def hello_route():
	return "hello, world!"    
