#!/usr/bin/env python3
"""All routes for tenant CRUD operations"""
from flask import Blueprint, request, jsonify, url_for
from bson.objectid import ObjectId
from app import tenantsCollection, mail, Message
from app.models.tenant import Tenant
from pymongo.errors import PyMongoError
from werkzeug.security import generate_password_hash
from bson.errors import InvalidId
import uuid
import logging

tenant_bp = Blueprint('tenant', __name__)
reset_tokens = {}

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

# Utility function to send emails
def send_email(subject, recipients, body):
    msg = Message(subject=subject, recipients=recipients, body=body)
    try:
        mail.send(msg)
        logging.debug(f"Email sent to {recipients}")
    except Exception as e:
        logging.error(f"Failed to send email to {recipients}: {e}")

# Create Tenant Account
@tenant_bp.route('/api/admin/tenants', methods=['POST'])
def create_tenant():
    """Create tenant as instance of Tenant, post tenant to MongoDB database,
       and send notification email with a reset password link.
    """
    data = request.json
    try:
        tenant = Tenant(
            name=data['name'],
            password=generate_password_hash(data['password']),
            dob=data['DoB'],
            sex=data['sex'],
            contact_details=data['contactDetails'],
            emergency_contact=data['emergencyContact'],
            tenancy_period=data['tenancyPeriod'],
            lease_agreement_details=data['leaseAgreementDetails']
        )
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        insert_result = tenantsCollection.insert_one(tenant.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    tenant_id = insert_result.inserted_id

    # Send notification email with a reset password link
    email = data['contactDetails']['email']
    reset_token = str(uuid.uuid4())
    reset_tokens[reset_token] = email
    reset_url = url_for('main.auth_bp.reset_password', token=reset_token, _external=True)
    email_body = f"Dear {data['name']['fname']},\n\nYour tenant account has been created successfully. Please use the following link to set your password: {reset_url}\n\nThank you."
    send_email("Tenant Account Created", [email], email_body)

    return jsonify({"msg": "Tenant created successfully", "tenantId": str(tenant_id)}), 201


# Get all tenants
@tenant_bp.route('/api/admin/tenants', methods=['GET'])
def get_all_tenants():
    """Find all tenants from MongoDB and return a list of all the tenants."""
    try:
        tenants = tenantsCollection.find({"active": True})
        tenants_list = [{
            "tenantId": str(tenant['_id']),
            "dateCreated": tenant['date_created'],
            "fname": tenant['name']['fname'],
            "lname": tenant['name']['lname'],
            "sex": tenant['sex'],
            "DoB": tenant['dob'],
            "phone": tenant['contact_details']['phone'],
            "email": tenant['contact_details']['email'],
            "address": tenant['contact_details']['address'],
            "rantageStarted": tenant['tenancy_period']['start'],
            "rantageExpires": tenant['tenancy_period']['expires'],
            "rentageArrears": tenant['tenancy_period']['arrears'],
            "emergencyContactName": tenant['emergency_contact']['name'],
            "emergencyContactPhone": tenant['emergency_contact']['phone'],
            "emergencyContactAddress": tenant['emergency_contact']['address'],
            "leaseAgreementDetails": tenant['lease_agreement_details']
        } for tenant in tenants]
        return jsonify(tenants_list), 200
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Get a Specific Tenant Details
@tenant_bp.route('/api/admin/tenants/<tenant_id>', methods=['GET'])
def get_tenant(tenant_id):
    try:
        tenant = tenantsCollection.find_one(
            {"_id": ObjectId(tenant_id), "active": True}
        )
        if tenant:
            return jsonify({
                "tenantId": str(tenant['_id']),
                "dateCreated": tenant['date_created'],
                "fname": tenant['name']['fname'],
                "lname": tenant['name']['lname'],
                "sex": tenant['sex'],
                "DoB": tenant['dob'],
                "phone": tenant['contact_details']['phone'],
                "email": tenant['contact_details']['email'],
                "address": tenant['contact_details']['address'],
                "rantageStarted": tenant['tenancy_period']['start'],
                "rantageExpires": tenant['tenancy_period']['expires'],
                "rentageArrears": tenant['tenancy_period']['arrears'],
                "emergencyContactName": tenant['emergency_contact']['name'],
                "emergencyContactPhone": tenant['emergency_contact']['phone'],
                "emergencyContactAddress": tenant['emergency_contact']['address'],
                "lease_agreement_details": tenant['lease_agreement_details']
            }), 200
        else:
            return jsonify({"error": "Tenant not found"}), 404
    except InvalidId:
        return jsonify({"error": "Invalid tenant ID format"}), 404
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Update Specific Tenant Details
@tenant_bp.route('/api/admin/tenants/<tenant_id>', methods=['PUT'])
def update_tenant(tenant_id):
    """Update a specific tenant with a tenant_id.
    Args:
        tenant_id (str): tenant unique id
    """
    data = request.json
    try:
        update_data = {
            "name": data['name'],
            "dob": data['DoB'],
            "sex": data['sex'],
            "contact_details": data['contactDetails'],
            "emergency_contact": data['emergencyContact'],
            "tenancy_period": data['tenancyPeriod'],
            "lease_agreement_details": data['leaseAgreementDetails']
        }
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        result = tenantsCollection.update_one(
            {"_id": ObjectId(tenant_id)}, {"$set": update_data}
        )
        if result.matched_count == 0:
            return jsonify({"msg": "Tenant not found"}), 404
        return jsonify({"msg": "Tenant updated successfully"}), 200
    except InvalidId:
        return jsonify({"error": "Invalid tenant ID format"}), 400
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Deactivate/Delete Tenant Account
@tenant_bp.route('/api/admin/tenants/<tenant_id>', methods=['DELETE'])
def delete_tenant(tenant_id):
    """Update a specific tenant with a tenant_id, setting the active attribute to False.
    Args:
        tenant_id (str): tenant unique id
    """
    try:
        result = tenantsCollection.update_one(
            {"_id": ObjectId(tenant_id)}, {"$set": {"active": False}}
        )
        if result.matched_count:
            return jsonify({"msg": "Tenant deactivated"}), 204
        return jsonify({"error": "Tenant not found"}), 404
    except InvalidId:
        return jsonify({"error": "Invalid tenant ID format"}), 400
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
