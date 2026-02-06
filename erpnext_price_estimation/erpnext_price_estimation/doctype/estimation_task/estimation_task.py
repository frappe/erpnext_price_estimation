# Copyright (c) 2026, frappe solutions and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

MODULE_PREFIX_MAP = {
    "Accounts": "AC",
    "Asset": "AS",
    "Buying": "BY",
    "CRM": "CM",
    "Custom Tasks": "CST",
    "HRMS": "HR",
    "Manufacturing": "MF",
    "Payroll": "PY",
    "Project": "PJ",
    "Selling": "SL",
    "Setup": "SU",
    "Stock": "ST",
}


class EstimationTask(Document):
    pass
