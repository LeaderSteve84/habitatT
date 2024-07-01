from flask import Blueprint, request, jsonify
from app.services.google_drive import upload_file_to_drive
from app.models.document import metadata_to_dict
import os
from app import documentsCollection


document_bp = Blueprint('document', __name__)

@document_bp.route('/upload', methods=['POST'])
def upload_document():
    """upload document to google drive.
    And save metadata to database.
    """
    file = request.files['file']
    file_name = file.filename
    file_path = os.path.join(os.getcwd(), 'uploads', file_name)
    file.save(file_path)

    # Upload file to Google Drive
    file_id = upload_file_to_drive(file_path, file_name, file.mimetype)

    # Create dictionary of metadata
    document = metadata_to_dict(file_id, file_name, file.mimetype)
    # Store metadata in the database
    documentsCollection.insert_one(document)
    return jsonify({'msg': 'file uploaded successfully', 'file_id': file_id}), 201
