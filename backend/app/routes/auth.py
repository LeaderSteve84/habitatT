#!/usr/bin/env python3
"""All routes for tenant CRUD operations"""
from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import JWTManager, create_access_token, \
    jwt_required, set_access_cookies, unset_jwt_cookies
from flask_mail import Message, Mail
from werkzeug.security import generate_password_hash, check_password_hash
from app import tenantsCollection, adminsCollection
from flask import current_app
import datetime
import uuid
import logging

mail = Mail()

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

auth_bp = Blueprint('auth_bp', __name__)
reset_tokens = {}


# Utility functions
def authenticate(email, password, role):
    email = email.strip().lower()
    print(f"Authenticating user with email: {email}")  # Debug print statement

    # Access email within nested contactDetails field
    logging.debug(f"Authenticating user with email: {email} and role: {role}")
    
    if role == 'admin':
        user = adminsCollection.find_one({"contact_details.email": email})
    elif role == 'tenant':
        user = tenantsCollection.find_one({"contact_details.email": email})
    else:
        logging.debug("Invalid role provided")
        return None
    
    if user:
        logging.debug(f"User found: {user['contact_details']['email']} with role: {role}")
        if check_password_hash(user["password"], password):
            logging.debug("Password match!")
            return user
        else:
            logging.debug("Password does not match!")
    else:
        logging.debug("User not found!")
    
    return None


@auth_bp.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        logging.debug("Request missing JSON")
        return jsonify({"msg": "Missing JSON in request"}), 400

    data = request.get_json()

    if not data:
        logging.debug("Invalid JSON")
        return jsonify({"msg": "Invalid JSON"}), 400

    email = data.get('email').strip().lower()  # Ensure email is lowercased and stripped
    password = data.get('password')
    role = data.get('role')
    remember_me = data.get('remember_me', False)
    
    if not email or not password or not role:
        logging.debug("Missing email, password, or role")
        return jsonify({"msg": "Missing email, password, or role"}), 400
    
    user = authenticate(email, password, role)
    
    if not user:
        logging.debug("Authentication failed")
        return jsonify({"msg": "Invalid email, password, or role"}), 401
    
    if role == 'tenant' and not user.get('active', False):
        logging.debug("Tenant account is not active")
        return jsonify({"msg": "Account is not active"}), 403
    
    expires = datetime.timedelta(days=7) if remember_me else datetime.timedelta(hours=1)
    access_token = create_access_token(identity={"email": email, "role": role}, expires_delta=expires)
    response = jsonify(msg="You have successfully logged in", access_token=access_token)
    set_access_cookies(response, access_token)

    logging.debug("User authenticated successfully")
    return response


@auth_bp.route('/api/forgot_password', methods=['POST'])
def forgot_password():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"msg": "Missing email"}), 400
    
    user = tenantsCollection.find_one({"contact_details.email": email}) or adminsCollection.find_one({"contact_details.email": email})
    if not user:
        return jsonify({"msg": "Email not found"}), 404
    
    reset_token = str(uuid.uuid4())
    reset_tokens[reset_token] = email
    reset_url = url_for('main.auth_bp.reset_password', token=reset_token, _external=True)
    
    print(f"Reset token: {reset_token}")
    
    msg = Message(subject="Password Reset Request",
                  recipients=[email],
                  body=f'Reset your password using the following link: {reset_url}')
    try:
        mail.send(msg)
        return jsonify({"msg": "Password Reset email sent"}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return jsonify({"msg": f"Failed to send email: {str(e)}"}), 500


@auth_bp.route('/api/reset_password/<token>', methods=['POST'])
def reset_password(token):
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    data = request.get_json()
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not new_password or not confirm_password:
        return jsonify({"msg": "Missing new password or confirmation"}), 400

    if new_password != confirm_password:
        return jsonify({"msg": "Passwords do not match"}), 400

    email = reset_tokens.get(token)
    if not email:
        return jsonify({"msg": "Invalid or expired token"}), 400
    
    user = tenantsCollection.find_one({"contact_details.email": email}) or adminsCollection.find_one({"contact_details.email": email})
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    new_hashed_password = generate_password_hash(new_password)
    if user.get('role') == 'admin':
        adminsCollection.update_one({"contact_details.email": email}, {"$set": {"password": new_hashed_password}})
    else:
        tenantsCollection.update_one({"contact_details.email": email}, {"$set": {"password": new_hashed_password}})
    
    del reset_tokens[token]  # Invalidate the token after use
    
    return jsonify({"msg": "Password has been reset"}), 200
