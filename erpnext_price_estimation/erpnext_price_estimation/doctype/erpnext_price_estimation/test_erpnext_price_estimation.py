# Copyright (c) 2024, frappe solutions and Contributors
# See license.txt

from unittest.mock import patch

import frappe
from frappe.tests.utils import FrappeTestCase

from erpnext_price_estimation.erpnext_price_estimation.doctype.erpnext_price_estimation.erpnext_price_estimation import (
    get_task_documents,
)


class TestERPNextPriceEstimation(FrappeTestCase):
    def setUp(self):
        self.doc = frappe.new_doc("ERPNext Price Estimation")
        self.doc.total_hourly_rate = 100
        self.doc.cloud_validity = 12
        self.doc.cloud_rate = 50
        self.doc.amc_validity = 6
        self.doc.amc_rate = 20

    def _add_row(self, table, applicability="Applicable", config=1.0, other=1.0):
        self.doc.append(
            table,
            {
                "task": "Test Task",
                "applicability": applicability,
                "default_configuration_effort": config,
                "other_effort": other,
            },
        )

    def test_valid_efforts_and_amounts(self):
        self._add_row("accounts_details", config=1.0, other=0.5)
        self._add_row("custom_tasks_details", config=1.5, other=1.0)

        self.doc.insert(ignore_mandatory=True)

        self.assertEqual(self.doc.total_config_effort, 2.5)
        self.assertEqual(self.doc.total_other_effort, 1.5)
        self.assertEqual(self.doc.total_combined_effort, 4.0)

        self.assertEqual(self.doc.total_amount, 400)
        self.assertEqual(self.doc.cloud_amount, 600)
        self.assertEqual(self.doc.amc_amount, 120)

    def test_invalid_config_effort(self):
        self._add_row("accounts_details", config=1.3, other=1.0)
        self.assertRaises(frappe.ValidationError, self.doc.insert)

    def test_invalid_other_effort(self):
        self._add_row("accounts_details", config=1.0, other=1.3)
        self.assertRaises(frappe.ValidationError, self.doc.insert)

    def test_custom_task_error_message(self):
        self._add_row("custom_tasks_details", config=1.3, other=1.0)
        self.assertRaises(frappe.ValidationError, self.doc.insert)

    def test_non_applicable_rows_ignored(self):
        self._add_row(
            "accounts_details", applicability="Not Applicable", config=5, other=5
        )

        self.doc.insert(ignore_mandatory=True)

        self.assertEqual(self.doc.total_combined_effort, 0)

    def test_none_values(self):
        self._add_row("accounts_details", config=None, other=None)

        self.doc.insert(ignore_mandatory=True)

        self.assertEqual(self.doc.total_config_effort, 0)
        self.assertEqual(self.doc.total_other_effort, 0)

    def test_zero_values(self):
        self._add_row("accounts_details", config=0, other=0)

        self.doc.insert(ignore_mandatory=True)

        self.assertEqual(self.doc.total_combined_effort, 0)

    def test_multiple_modules(self):
        self._add_row("accounts_details", config=1.0, other=1.0)
        self._add_row("buying_details", config=2.0, other=0.5)

        self.doc.insert(ignore_mandatory=True)

        self.assertEqual(self.doc.total_config_effort, 3.0)
        self.assertEqual(self.doc.total_other_effort, 1.5)

    def test_amount_calculation(self):
        self.doc.total_combined_effort = 10
        self.doc.validate_total_amount()

        self.assertEqual(self.doc.total_amount, 1000)

    def test_cloud_amount(self):
        self.doc.validate_cloud_amount()
        self.assertEqual(self.doc.cloud_amount, 600)

    def test_amc_amount(self):
        self.doc.validate_amc_amount()
        self.assertEqual(self.doc.amc_amount, 120)

    def _make_task(self, task_name, module):
        task = frappe.new_doc("Estimation Task")
        task.task_name = task_name
        task.module = module
        return task.insert(ignore_mandatory=True)

    def test_get_task_documents(self):
        task = self._make_task("Test Task", "Accounts")

        result = get_task_documents(module="Accounts")

        self.assertTrue(any(d["name"] == task.name for d in result))

    def test_get_task_documents_module_filter_excludes_others(self):
        accounts_task = self._make_task("Accounts Task", "Accounts")
        buying_task = self._make_task("Buying Task", "Buying")

        result = get_task_documents(module="Accounts")
        names = [d["name"] for d in result]

        self.assertIn(accounts_task.name, names)
        self.assertNotIn(buying_task.name, names)

    def test_get_task_documents_requires_read_permission(self):
        user = "test-price-estimation@example.com"
        if not frappe.db.exists("User", user):
            user_doc = frappe.new_doc("User")
            user_doc.email = user
            user_doc.first_name = "Price Estimation Test"
            user_doc.insert(ignore_permissions=True)

        frappe.set_user(user)
        try:
            self.assertRaises(frappe.PermissionError, get_task_documents)
        finally:
            frappe.set_user("Administrator")

    def test_valid_party_doctype(self):
        # allowlisted and installed on the site
        with patch.object(frappe.db, "exists", return_value=True):
            for doctype in ("Customer", "Lead", "Prospect", "CRM Lead", "CRM Deal"):
                self.doc.opportunity_from = doctype
                self.doc.validate_party()

    def test_invalid_party_doctype(self):
        # not in the allowlist; rejected before the existence check
        self.doc.opportunity_from = "User"
        self.assertRaises(frappe.ValidationError, self.doc.validate_party)

    def test_allowlisted_party_doctype_not_installed(self):
        # in the allowlist but the doctype is not installed on this site
        self.doc.opportunity_from = "CRM Lead"
        with patch.object(frappe.db, "exists", return_value=False):
            self.assertRaises(frappe.ValidationError, self.doc.validate_party)

    def test_company_rejected_when_doctype_missing(self):
        self.doc.company = "Some Company"
        with patch.object(frappe.db, "exists", return_value=False):
            self.assertRaises(frappe.ValidationError, self.doc.validate_company)

    def test_company_allowed_when_doctype_exists(self):
        self.doc.company = "Some Company"
        self.doc.validate_company()

    def test_duplicate_custom_task_names_across_documents(self):
        # regression: child rows must not collide on identical task names
        self._add_row("custom_tasks_details", config=1.0, other=1.0)
        self.doc.insert(ignore_mandatory=True)

        doc2 = frappe.new_doc("ERPNext Price Estimation")
        doc2.append(
            "custom_tasks_details",
            {
                "task": "Test Task",
                "applicability": "Applicable",
                "default_configuration_effort": 1.0,
                "other_effort": 1.0,
            },
        )
        doc2.insert(ignore_mandatory=True)

        self.assertTrue(doc2.name)
