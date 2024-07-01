#!/usr/bin/env python3
"""return dict. of metadata"""
from datetime import datetime


def metadata_to_dict(file_id, file_name, mime_type):
    """make dictionary of metadata.
    Args:
        flie_id (str): file id
        file_name (str): name of file
        mime_type (str): mime type
    Return: dictionary of metadata.
    """
    return {
        'file_id': file_id,
        'file_name': file_name,
        'mime_type': mime_type,
        'upload_date': datetime.utcnow()
    }
