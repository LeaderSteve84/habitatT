#!/usr/bin/env python3
"""google drive api"""

import os
from gogle.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Path to the service account key file
SERVICE_ACCOUNT_FILE = 'path/to/credentials/json'

# Scopes required for accessing Google Drive
SCOPES = ['https://www.googleapis.com/auth/drive']

# Authenticate and create a service object
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('drive', 'v3', credentials=credentials)

def upload_file_to_drive(file_path, file_name, mime_type):
    file_metadata = {'name': file_name}
    media = MediaFileUpload(file_path, mimetype=mime_type)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    return file.get('id')
