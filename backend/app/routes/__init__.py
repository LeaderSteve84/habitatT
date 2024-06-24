#!/usr/bin/env python3
"""routes package init"""
from flask import Blueprint
from app.routes import tenant,auth

bp = Blueprint('main', __name__)

# Register the sub_blueprints to the main blueprint
bp.register_blueprint(tenant.tenant_bp)
bp.register_blueprint(auth.auth_bp)
