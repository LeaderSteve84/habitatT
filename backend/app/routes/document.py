from flask import Blueprint, request, jsonify
from app.services.google_drive import upload_file_to_drive
from app.models.document import save_file_metadata
import os


document_bp = Blueprint('document', __name__)

@document_bp.route('/upload', methods=['POST'])
def upload_document():
    file = request.files['file']
    file_name = file.filename
    file_path = os.path.join('/path/to/upload/directory', file_name)
    file.save(file_path)

    # Upload file to Google Drive
    file_id = upload_file_to_drive(file_path, file_name, file.mimetype)

    # Store metadata in the database
    save_file_metadata(file_id, file_name, file.mimetype)

    return jsonify({'file_id': file_id, 'message': 'file uploaded successfully'}), 201
