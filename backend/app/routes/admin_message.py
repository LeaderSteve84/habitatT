#!/usr/bin/env python3
"""All routes for admin message CRUD operations"""
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from app import messagesCollection
from app.models.admin_message import AdminMessage
from pymongo.errors import PyMongoError


admin_message_bp = Blueprint('admin_message', __name__)


# Create Admin Message
@admin_message_bp.route('/api/admin/messages', methods=['POST'])
def create_message():
    """Create an admin message.
       POST message to MongoDB database.
       Return: "msg": "Message created successfully" and success status
    """
    data = request.json
    try:
        message = AdminMessage(
            message=data['message'],
            title=data['title'],
            date=data['date']
        )
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        insert_result = messagesCollection.insert_one(message.to_dict())
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    message_id = insert_result.inserted_id
    return jsonify(
        {"msg": "Message created successfully", "messageId": str(message_id)}
    ), 201


# Get all Admin Messages
@admin_message_bp.route('/api/admin/messages', methods=['GET'])
def get_all_messages():
    """Find all messages from MongoDB and return list of all the messages"""
    try:
        messages = messagesCollection.find()
        messages_list = [{
            "messageId": str(message['_id']),
            "dateCreated": message['date_created'],
            "message": message['message'],
            "title": message['title'],
            "date": message['date']
        } for message in messages]
        return jsonify(messages_list), 200
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Update Specific Admin Message
@admin_message_bp.route('/api/admin/messages/<message_id>', methods=['PUT'])
def update_message(message_id):
    """
    """
