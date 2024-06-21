from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from app import mongo
from app.models.tenant import Tenant

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
    tenant = Tenant(
        name=data['name'],
        dob=data['DoB'],
        sex=data['sex'],
        contact_details=data['contactDetails'],
        emergency_contact=data['emergencyContact'],
        lease_agreement_details=data['leaseAgreementDetails']
    )
    insert_id = mongo.db.tenants.insert_one(tenant.to_dict()).insert_id
    return jsonify({"msg": "Tenant created successfully", "tenantId": str(inserted_id)}), 201


# Get all tenants
@tenant_bp.route('/api/admin/tenants', methods=['GET'])
def get_all_tenants():
    """find all tenants fron mongodb and
    return list of all the tenants
    """
    tenants = mongodb.tenants.find()
    tenant_list = [{
        "tenantId": str(tenant['_id']),
        "name": tenant['name'],
        "sex": tenant['sex'],
        "email": tenant['contact_details']['email'],
        "phone": tenant['contact_details']['phone'],
        "address": tenant['contact_details']['address']
    } for tenant in tenants]
    return jsonify(tenant_list), 200


# Get a Specific Tenant Details
@tenant_bp.route('/api/admin/tenants/<tenant_id', methods=['GET'])
def get_tenant(tenantId):
    tenant = mongo.db.tenants.find_one({"_id": ObjectId(tenantId)})
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


# Update Specific Tenant Details
@tenant_bp.route('/api/admin/tenants/<tenant_id', methods=['PUT'])
def update_tenant(tenant_id):
    """update a specific tenant with a tenant_id.
    Args:
        tenant_id  (str): tenant unique id
    """
    data = request.json
    update_data = {
        "name": data['name'],
        "dob": data['DoB'],
        "sex": data['sex'],
        "contact_details": data['contactDetails'],
        "emergency_contact": date['emergencyContact'],
        "lease_agreement_details": data['leaseAgreementDetails']
    }
    result = mongo.db.tenants.update_one({"_id": ObjectId(tenant_id)}, {"$set": update_data})
    if result.matched_count == 0:
        return jsonify({"msg": "Tenant not found"}), 404
    return jsonify({"msg": "Tenant updated successfully"}), 200
