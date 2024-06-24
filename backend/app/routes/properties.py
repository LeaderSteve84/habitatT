#!/usr/bin/env python3
"""All routes for property CRUD operations"""
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from app import propMngCollection
from app.models.property import Property
from pymongo.errors import PyMongoError


property_bp = Blueprint('property', __name__)


# Create Property
@property_bp.route('/api/admin/properties', methods=['POST'])
def create_property():
    """Create a new property instance and store it in the database.
       Return: "msg": "Property created successfully"
       and success status
    """
    data = request.json
    try:
        property = Property(
            address=data['address'],
            property_type=data['type'],
            unit_availability=data['unitAvailability'],
            rental_fees=data['rentalFees']
        )
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        insert_result = propMngCollection.insert_one(property.to_dict())
    except Exception as e:
        return jsonify({"eror": str(e)}), 500

    property_id = insert_result.inserted_id
    return jsonify(
        {"msg": "prop. created successfully", "prop_Id": str(property_id)}
    ), 201


# Get All Properties
@property_bp.route('/api/admin/properties', methods=['GET'])
def get_all_properties():
    """Retrieve all properties from the database.
    Return: List of properties
    """

    try:
        properties = propMngCollection.find()
        properties_list = [{
            "propertyId": str(property['_id']),
            "dateCreated": property['date_created'],
            "address": property['address'],
            "type": property['type'],
            "unitAvailability": property['unit_availability'],
            "rentalFees": property['rental_fees']
        } for property in properties]
        return jsonify(properties_list), 200
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Get Specific Property Details
@property_bp.route('/api/admin/properties/<property_id>', methods=['GET]'])
def get_property(property_id):
    """Retrieve details of a specific property by ID.
    """
    try:
        property = propMngCollection.find_one({"_id": ObjectId(property_id)})
        if property:
            return jsonify({
                "propertyId": str(property['_id']),
                "dateCreated": property['date_created'],
                "address": property['address'],
                "type": property['type'],
                "unitAvailability": property['unit_availability'],
                "rentalFees": property['rental_fees']
            }), 200
        else:
            return jsonify({"error": "Property not found"}), 404
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Update Property Details
@property_bp.route('/api/admin/properties/<property_id>', methods=['PUT'])
def update_property(property_id):
    """Update a specific property by ID."""
    data = request.json
    try:
        update_data = {
            "address": data['address'],
            "type": data['type'],
            "unit_availability": data['unitAvailability'],
            "rental_fees": data['rentalFees']
        }
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        result = propMngCollection.update_one(
            {"_id": ObjectId(property_id)}, {"$set": update_data}
        )
        if result.matched_count == 0:
            return jsonify({"msg": "Property not found"}), 404
        return jsonify({"msg": "Property updated successfully"}), 200
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Delte Property
@property_bp.route('/api/admin/properties/<property_id>', methods=['DELETE'])
def delete_property(property_id):
    """Dlete a specific property by ID."""
    try:
        result = propMngCollection.delete_one({"_id": ObjectId(property_id)})
        if result.deleted_count:
            return jsonify({"msg": "Property deleted successfully"}), 204
        return jsonify({"error": "Property not found"}), 404
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
