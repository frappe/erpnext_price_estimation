# Copyright (c) 2024, frappe solutions and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

# ERPNext and Frappe CRM party doctypes; whichever are installed are valid
PARTY_DOCTYPES = ["Customer", "Lead", "Prospect", "CRM Lead", "CRM Deal"]


class ERPNextPriceEstimation(Document):
    def validate(self):
        self.validate_company()
        self.validate_party()
        self.validate_total_efforts()
        self.validate_total_amount()
        self.validate_cloud_amount()
        self.validate_amc_amount()

    def validate_company(self):
        if self.company and not frappe.db.exists("DocType", "Company"):
            frappe.throw(_("Company is not available on this site"))

    def validate_party(self):
        if not self.opportunity_from:
            return

        if self.opportunity_from not in PARTY_DOCTYPES:
            frappe.throw(
                _("Opportunity From must be one of {0}").format(
                    ", ".join(PARTY_DOCTYPES)
                )
            )

        if not frappe.db.exists("DocType", self.opportunity_from):
            frappe.throw(
                _("{0} is not available on this site").format(self.opportunity_from)
            )

    def validate_total_efforts(self):
        total_config_effort = 0
        total_other_effort = 0

        task_modules = [
            "accounts_details",
            "asset_details",
            "buying_details",
            "stock_details",
            "crm_details",
            "payroll_details",
            "selling_details",
            "hrms_details",
            "project_details",
            "manufacturing_details",
            "setup_details",
            "custom_tasks_details",
        ]

        errors = []

        for task_module in task_modules:
            for row in self.get(task_module, []):
                if row.applicability == "Applicable":
                    config = row.default_configuration_effort or 0
                    other = row.other_effort or 0

                    if (config * 10) % 5 != 0:
                        if task_module == "custom_tasks_details":
                            errors.append(
                                f"{task_module} Row {row.idx}: overall effort must be in multiples of 0.5"
                            )
                        else:
                            errors.append(
                                f"{task_module} Row {row.idx}: default configuration effort must be in multiples of 0.5"
                            )

                    if (other * 10) % 5 != 0:
                        errors.append(
                            f"{task_module} Row {row.idx}: other effort must be in multiples of 0.5"
                        )

                    total_config_effort += config
                    total_other_effort += other

        if errors:
            frappe.throw("<br>".join(errors))

        self.total_config_effort = total_config_effort
        self.total_other_effort = total_other_effort
        self.total_combined_effort = total_config_effort + total_other_effort

    def validate_total_amount(self):
        self.total_amount = (self.total_hourly_rate or 0) * (
            self.total_combined_effort or 0
        )

    def validate_cloud_amount(self):
        self.cloud_amount = (self.cloud_validity or 0) * (self.cloud_rate or 0)

    def validate_amc_amount(self):
        self.amc_amount = (self.amc_validity or 0) * (self.amc_rate or 0)


@frappe.whitelist()
def get_task_documents(process=None, module=None):
    frappe.has_permission("Estimation Task", "read", throw=True)

    filters = {}

    if module:
        filters["module"] = module

    task_details = frappe.get_all(
        "Estimation Task",
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
