# Copyright (c) 2026, frappe solutions and contributors
# For license information, please see license.txt

import frappe
import re
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

class Task(Document):
	def validate(self):
		self.validate_task_id()
		self.validate_doctypes_involved()

	def validate_task_id(self):
		if not self.task_id:
			frappe.throw("Task ID must be provided.")

		prefix = MODULE_PREFIX_MAP.get(self.module)
		if not prefix:
			frappe.throw(f"No prefix defined for module '{self.module}'.")

		pattern = f"^{prefix}-\\d{{3}}$"

		if not re.match(pattern, self.task_id):
			frappe.throw(
				f"Task ID '{self.task_id}' is invalid for module '{self.module}'. "
				f"Expected format like '{prefix}-001'."
			)

	def validate_doctypes_involved(self):
		if not self.doctypes_involved:
			return

		for line in self.doctypes_involved.splitlines():
			stripped_line = line.strip()

			if not stripped_line:
				continue

			if not stripped_line.startswith("- "):
				frappe.throw(
					"Invalid doctypes_involved format. Expected '- <Doctype>' per line."
				)

			doctype = stripped_line[2:].strip()

			if not doctype:
				frappe.throw(
					"Invalid doctypes_involved entry: empty doctype."
				)

			if "," in doctype:
				frappe.throw(
					"Invalid doctypes_involved entry: comma-separated values are not allowed."
				)

			if "-" in doctype:
				frappe.throw(
					"Invalid doctypes_involved entry: multiple doctypes in a single line."
				)
