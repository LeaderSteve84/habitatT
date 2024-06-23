#!/usr/bin/env python3
"""model for tenants"""
from bson.objectid import ObjectId
from datetime import datatime

class Tenant:
    """class of the tenant instance"""
    def __init__(
        self, name, password, dob, sex, contact_details, emergency_contact,
        tenancy_period, lease_agreement_details, tenant_id=None,
        active=True
    ):
        """Initializer/object constructor.
        Args:
            name (dict): dictionary containing the fname and lname
            dob  (time): date of birth
            sex  (str):  sex
            contact_details (dict): dict of phone, email, and address.
            emergency_contact (dict): dict name, phone, address
            lease_agreement_details (str): url of leease agreement
            active  (bool): Status of Tenancy. True by default
        """
        self.tenant_id = tenant_id if tenant_id else ObjectId()
        self.date_created = datetime.now()
        self.name = name
        self.password = password  # hashed password
        self.dob = dob
        self.sex = sex
        self.contact_details = contact_details
        self.emergency_contact = emergency_contact
        self.tenancy_period = tenancy_period
        self.lease_agreement_details = lease_agreement_details
        self.active = active

    def to_dict(self):
        """returns the dictionary of all the Tenant attributes"""
        return {
            "_id": self.tenant_id,
            "date_created": self.date_created,
            "name": self.name,
            "password": self.password,
            "dob": self.dob,
            "sex": self.sex,
            "contact_details": self.contact_details,
            "emergency_contact": self.emergency_contact,
            "tenancy_period": self.tenancy_period,
            "lease_agreement_details": self.lease_agreement_details,
            "active": self.active
        }
