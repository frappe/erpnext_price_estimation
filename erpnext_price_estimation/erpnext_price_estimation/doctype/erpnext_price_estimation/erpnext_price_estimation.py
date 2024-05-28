# Copyright (c) 2024, frappe solutions and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ERPNextPriceEstimation(Document):
    pass

@frappe.whitelist()
def get_process_documents(process=None, module=None):
    filters = {}

    if process:
        filters['process'] = process
    if module:
        filters['module'] = module

    process_details = frappe.get_all(
        'Estimation Document', 
        fields=['document_name', 'process_name', 'configuration_effort', 'other_effort'], 
        filters=filters
    )

    return process_details

