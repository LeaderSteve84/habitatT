#!/usr/bin/env python3
"""All routes for tenant CRUD operations"""
from flask import Blueprint, request, jsonify,url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask_mail import Message, Mail
from bson.objectid import ObjectId
from app import tenantsCollection
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
from app import tenantsCollection
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
def authenticate(email, password):
    # Trim whitespace and convert email to lowercase
    email = email.strip().lower()
    print(f"Authenticating user with email: {email}")  # Debug print statement
    
    # Access email within nested contactDetails field
    user = tenantsCollection.find_one({"contact_details.email": email})
    if user:
        print(f"User found: {user['contact_details']['email']}")  # Debug print statement
        if check_password_hash(user["password"], password):
            print("Password match!")  # Debug print statement
            return user
        else:
            print("Password does not match!")  # Debug print statement
    else:
        print("User not found!")  # Debug print statement
    return None

@auth_bp.route('/login', methods=['POST'])
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
    remember_me = data.get('remember_me', False)
    
    if not email or not password:
        logging.debug("Missing email or password")
        return jsonify({"msg": "Missing email or password"}), 400
    
    logging.debug(f"Looking up user by email: {email}")
    user = tenantsCollection.find_one({"contact_details.email": email})
    
    if not user:
        logging.debug("User not found")
        return jsonify({"msg": "Invalid email or password"}), 401
    
    logging.debug(f"User found: {user['contact_details']['email']}")
    
    if not check_password_hash(user["password"], password):
        logging.debug("Password does not match")
        return jsonify({"msg": "Invalid email or password"}), 401
    
    expires = datetime.timedelta(days=7) if remember_me else datetime.timedelta(hours=1)
    access_token = create_access_token(identity=email, expires_delta=expires)
    response = jsonify(msg="You have successfully logged in", access_token=access_token)
    set_access_cookies(response, access_token)
    
    logging.debug("User authenticated successfully")
    return response

@auth_bp.route('/forgot_password', methods=['POST'])
def forgot_password():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"msg": "Missing email"}), 400
    
    user = tenantsCollection.find_one({"contact_details.email": email})
    if not user:
        return jsonify({"msg": "Email not found"}), 404
    
    # Generate a reset token
    reset_token = str(uuid.uuid4())
    reset_tokens[reset_token] = email
    reset_url = url_for('main.auth_bp.reset_password', token=reset_token, _external=True)
    
    # Print the reset token for testing purposes
    print(f"Reset token: {reset_token}")
    
    # Send email with reset link
    msg = Message(subject="Password Reset Request",
                  recipients=[email],
                  body=f'Reset your password using the following link: {reset_url}')
    try:
        mail.send(msg)
        return jsonify({"msg": "Password Reset email sent"}), 200
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return jsonify({"msg": f"Failed to send email: {str(e)}"}), 500

@auth_bp.route('/reset_password/<token>', methods=['POST'])
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
    
    user = tenantsCollection.find_one({"contact_details.email": email})
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    # Update the user's password
    new_hashed_password = generate_password_hash(new_password)
    tenantsCollection.update_one({"contact_details.email": email}, {"$set": {"password": new_hashed_password}})
    del reset_tokens[token]  # Invalidate the token after use
    
    return jsonify({"msg": "Password has been reset"}), 200