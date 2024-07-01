#!/usr/bin/env python3
"""google drive api"""

import os
import logging
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Path to the service account key file
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), '../../credentials.json')

# Scopes required for accessing Google Drive
SCOPES = ['https://www.googleapis.com/auth/drive']

# Authentication and creation of a service object
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)


def upload_file_to_drive(file_path, file_name, mime_type):
    logger.info("Starting upload to Google Drive")
    
    # specify the folder id
    folder_id = "1uDwOkVv55uPncLe_w2RuyJT70lWYn4xs"
    file_metadata = {
        'name': file_name,
        'parents': [folder_id]        
    }
    media = MediaFileUpload(file_path, mimetype=mime_type)

    try:
        file = service.files().create(
            body=file_metadata, media_body=media, fields='id'
        ).execute()
        file_id = file.get('id')
        logger.info(f"File uploaded successfully. File ID: {file_id}")
        return file_id
    except Exception as e:
        logger.error(f"An error occured: {e}")
        raise
