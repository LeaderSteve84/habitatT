#!/usr/bin/env python3
"""All routes for tenant CRUD operations"""
from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from anpp import tenantsCollection
from app.models.tenant import Tenant
from pymongo.errors import PyMongoError


tenant_bp = Blueprint('tenant', __name__)


# Create Tenant Account
@tenant_bp.route('/api/admin/tenants', methods=['POST'])
def create_tenant():
    """create tenant as instance of Tenant.
       post tenant to mongodb database.
       Return: "msg": "Tenant created successfully"
       and success status
    """
    data = request.json
    try:
        tenant = Tenant(
            name=data['name'],
            dob=data['DoB'],
            sex=data['sex'],
            contact_details=data['contactDetails'],
            emergency_contact=data['emergencyContact'],
            lease_agreement_details=data['leaseAgreementDetails']
        )
    except KeyError as e:
        return jsonify({"error": f"Missing field {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    try:
        insert_result = tenantsCollection.insert_one(tenant.to_dict())
    except Exception as e:
        return jsonify(
            {"error": str(e)}, 500
        ), 500
    tenant_id = insert_result.inserted_id
    return jsonify(
        {"msg": "Tenant created successfully", "tenantId": str(tenant_id)}
    ), 201


# Get all tenants
@tenant_bp.route('/api/admin/tenants', methods=['GET'])
def get_all_tenants():
    """find all tenants fron mongodb and
    return list of all the tenants
    """
    try:
        tenants = tenantsCollection.find({"active": True})
        tenants_list = [{
            "tenantId": str(tenant['_id']),
            "name": tenant['name'],
            "sex": tenant['sex'],
            "email": tenant['contact_details']['email'],
            "phone": tenant['contact_details']['phone'],
            "address": tenant['contact_details']['address']
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
                "name": tenant['name'],
                "dob": tenant['dob'],
                "sex": tenant['sex'],
                "contact_details": tenant['contact_details'],
                "emergency_contact": tenant['emergency_contact'],
                "lease_agreement_details": tenant['lease_agreement_details']
            }), 200
        else:
            return jsonify({"error": "Tenant not found"}), 404
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Update Specific Tenant Details
@tenant_bp.route('/api/admin/tenants/<tenant_id>', methods=['PUT'])
def update_tenant(tenant_id):
    """update a specific tenant with a tenant_id.
    Args:
        tenant_id  (str): tenant unique id
    """
    data = request.json
    try:
        update_data = {
            "name": data['name'],
            "dob": data['DoB'],
            "sex": data['sex'],
            "contact_details": data['contactDetails'],
            "emergency_contact": data['emergencyContact'],
            "lease_agreement_details": data['leaseAgreementDetails']
        }
    except keyError as e:
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
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


# Deactivate/Delete Tenant Account
@tenant_bp.route('/api/admin/tenants/<tenant_id>', methods=['DELETE'])
def delete_tenant(tenant_id):
    """update a specific tenant with a tenant_id.
    setting the active attribute to False
    Args:
        tenant_id  (str): tenant unique id
    """
    try:
        result = tenantsCollection.update_one(
            {"_id": ObjectId(tenant_id)}, {"$set": {"active": False}}
        )
        if result.matched_count:
            return jsonify({"msg": "Tenant deactivated"}), 204
        return jsonify({"error": "Tenant not found"}), 404
    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
