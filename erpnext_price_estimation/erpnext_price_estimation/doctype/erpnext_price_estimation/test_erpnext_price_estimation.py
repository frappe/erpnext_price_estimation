# Copyright (c) 2024, frappe solutions and Contributors
# See license.txt

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

    def test_get_task_documents(self):
        task = frappe.get_doc(
            {
                "doctype": "Estimation Task",
                "task_name": "Test Task",
                "module": "Accounts",
            }
        ).insert(ignore_mandatory=True)

        result = get_task_documents(module="Accounts")

        self.assertTrue(any(d["name"] == task.name for d in result))
