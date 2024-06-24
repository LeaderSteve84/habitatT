#!/usr/bin/env python3
"""routes package init"""
from flask import Blueprint
from app.routes import tenant, admin_message, property, listing

bp = Blueprint('main', __name__)

# Register the sub_blueprints to the main blueprint
bp.register_blueprint(tenant.tenant_bp)
bp.register_blueprint(admin_message.admin_message_bp)
bp.register_blueprint(property.property_bp)
bp.register_blueprint(listing.listing_bp)
