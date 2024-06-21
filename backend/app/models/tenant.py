from bson import ObjectId


class Tenant:
    """class of the tenant instance"""
    def __init__(self, name, dob, sex, contact_details, emergency_contact, lease_agreement_details, tenant_id=None):
        """Initializer/object constructor.
        Args:
            name (dict): dictionary containing the fname and lname
            dob  (time): date of birth 
            sex  (str):  sex
            contact_details (dict): dict of phone, email, and address.
            emergency_contact (dict): dict name, phone, address
            lease_agreement_details (str): url of leease agreement 
        """
        self.tenant_id = tenant_id if tenant_id else ObjectId()
        self.name = name
        self.dob = dob
        self.sex = sex
        self.contact_details = contact_details
        self.emergency_contact = emergency_contact
        self.lease_agreement_details = lease_agreement_details

    def to_dict(self):
        """returns the dictionary of all the Tenant attributes"""
        return {
            "_id": self.tenant_id,
            "name": self.name,
            "dob": self.dob,
            "sex": self.sex,
            "contact_details": self.contact_details,
            "emergency_contact": self.emergency_contact,
            "lease_agreement_details": self.lease_agreement_details
        }
