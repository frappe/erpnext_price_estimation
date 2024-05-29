app_name = "erpnext_price_estimation"
app_title = "ERPNext Price Estimation"
app_publisher = "frappe solutions"
app_description = "ERPNext Price Estimation"
app_email = "poorvi@frappe.io"
app_license = "mit"

fixtures = [
    "Estimation Process",
    "Estimation Document"
]
override_whitelisted_methods = {
    "erpnext_price_estimation.erpnext_price_estimation.doctype.erpnext_price_estimation.erpnext_estimation.get_process_documents": "erpnext_price_estimation.erpnext_price_estimation.doctype.erpnext_price_estimation.erpnext_estimation.get_process_documents"
}
