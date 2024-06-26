#!/usr/bin/env python3
"""Communication routes module"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app import tenantsCollection, adminsCollection, messagesCollection, socketio
from app.models.communication import CommunicationModel
from flask_socketio import emit

communication_bp = Blueprint('communication_bp', __name__)
communication_model = CommunicationModel(messagesCollection)

def get_initials(first_name, last_name):
    return first_name[0].upper() + last_name[0].upper()

@communication_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = communication_model.get_all_messages()
    return jsonify(messages), 200

@communication_bp.route('/send_message', methods=['POST'])
@jwt_required()
def send_message():
    identity = get_jwt_identity()
    if 'username' not in identity or 'role' not in identity:
        return jsonify({"msg": "Invalid token data"}), 400

    user_collection = adminsCollection if identity['role'] == 'admin' else tenantsCollection
    user = user_collection.find_one({"contact_details.email": identity['username']})
    if not user:
        return jsonify({"msg": "User not found"}), 404

    message = request.json.get('message')
    if not message:
        return jsonify({"msg": "Invalid data"}), 400

    timestamp = datetime.utcnow().isoformat()
    initials = get_initials(user['name']['fname'], user['name']['lname'])
    msg = {
        'name': initials,
        'message': message,
        'timestamp': timestamp
    }
    communication_model.add_message(msg)
    
    # Emit the message to the 'receive_message' event without 'broadcast=True'
    socketio.emit('receive_message', msg)

    return jsonify(msg), 201