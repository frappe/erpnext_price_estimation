# Copyright (c) 2024, frappe solutions and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ERPNextPriceEstimation(Document):
    pass


@frappe.whitelist()
def get_task_documents(process=None, module=None):
    filters = {}

    if module:
        filters["module"] = module

    task_details = frappe.get_all(
        "Task",
        fields=[
            "name",
            "task_name",
            "task_reference",
            "default_configuration_effort",
            "other_effort",
        ],
        filters=filters,
        order_by="name",
    )
    return task_details
