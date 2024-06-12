function add_efforts(frm, table, module) {
    frappe.call({
        method: 'erpnext_price_estimation.erpnext_price_estimation.doctype.erpnext_price_estimation.erpnext_price_estimation.get_process_documents',
        args: {
            module: module
        },
        callback: function(r) {
            let current_list = [];
            $.each(frm.doc[table] || [], function(i, row) {
                current_list.push(row.estimation_document);
            });
            $.each(r.message || [], function(i, row) {
                if (!current_list.includes(row.document_name)) {
                    let item = frappe.model.add_child(frm.doc, 'Estimation Detail', table);
                    frappe.model.set_value(item.doctype, item.name, 'estimation_document', row.document_name);
                    frappe.model.set_value(item.doctype, item.name, 'estimation_process', row.process_name);
                    frappe.model.set_value(item.doctype, item.name, 'configuration_efforts', row.configuration_effort);
                    frappe.model.set_value(item.doctype, item.name, 'other_efforts', row.other_effort);
                }
            });
            frm.refresh_field(table);
        }
    });
}

frappe.ui.form.on('ERPNext Price Estimation', {
    accounts: function(frm) {
        if (frm.doc.accounts) {
            add_efforts(frm, 'accounts_details', 'Accounts');
        } else {
            frm.clear_table("accounts_details");
            frm.refresh_field("accounts_details");
            frm.events.calculate_totals(frm);
        }
    },
    buying: function(frm) {
        if (frm.doc.buying) {
            add_efforts(frm, 'buying_details', 'Buying');
        } else {
            frm.clear_table("buying_details");
            frm.refresh_field("buying_details");
            frm.events.calculate_totals(frm);
        }
    },
    stock: function(frm) {
        if (frm.doc.stock) {
            add_efforts(frm, 'stock_details', 'Stock');
        } else {
            frm.clear_table("stock_details");
            frm.refresh_field("stock_details");
            frm.events.calculate_totals(frm);
        }
    },
    crm: function(frm) {
        if (frm.doc.crm) {
            add_efforts(frm, 'crm_details', 'CRM');
        } else {
            frm.clear_table("crm_details");
            frm.refresh_field("crm_details");
            frm.events.calculate_totals(frm);
        }
    },
    payroll: function(frm) {
        if (frm.doc.payroll) {
            add_efforts(frm, 'payroll_details', 'Payroll');
        } else {
            frm.clear_table("payroll_details");
            frm.refresh_field("payroll_details");
            frm.events.calculate_totals(frm);
        }
    },
    selling: function(frm) {
        if (frm.doc.selling) {
            add_efforts(frm, 'selling_details', 'Selling');
        } else {
            frm.clear_table("selling_details");
            frm.refresh_field("selling_details");
            frm.events.calculate_totals(frm);
        }
    },
    hrms: function(frm) {
        if (frm.doc.hrms) {
            add_efforts(frm, 'hrms_details', 'HR');
        } else {
            frm.clear_table("hrms_details");
            frm.refresh_field("hrms_details");
            frm.events.calculate_totals(frm);
        }
    },
    projects: function(frm) {
        if (frm.doc.projects) {
            add_efforts(frm, 'projects_details', 'Projects');
        } else {
            frm.clear_table("projects_details");
            frm.refresh_field("projects_details");
            frm.events.calculate_totals(frm);
        }
    },
    manufacturing: function(frm) {
        if (frm.doc.manufacturing) {
            add_efforts(frm, 'manufacturing_details', 'Manufacturing');
        } else {
            frm.clear_table("manufacturing_details");
            frm.refresh_field("manufacturing_details");
            frm.events.calculate_totals(frm);
        }
    },
    setup: function(frm) {
        if (frm.doc.setup) {
            add_efforts(frm, 'setup_details', 'Setup');
        } else {
            frm.clear_table("setup_details");
            frm.refresh_field("setup_details");
            frm.events.calculate_totals(frm);
        }
    },
    healthcare: function(frm) {
        if (frm.doc.healthcare) {
            add_efforts(frm, 'healthcare_details', 'Healthcare');
        } else {
            frm.clear_table("healthcare_details");
            frm.refresh_field("healthcare_details");
            frm.events.calculate_totals(frm);
        }
    },
    education: function(frm) {
        if (frm.doc.education) {
            add_efforts(frm, 'education_details', 'Education');
        } else {
            frm.clear_table("education_details");
            frm.refresh_field("education_details");
            frm.events.calculate_totals(frm);
        }
    },
    customization: function(frm) {
        if (frm.doc.customization) {
            add_efforts(frm, 'customizations_details', 'Customization');
        } else {
            frm.clear_table("customizations_details");
            frm.refresh_field("customizations_details");
            frm.events.calculate_totals(frm);
        }
    },
    validate: function(frm) {
        frm.events.calculate_totals(frm);
    },
    calculate_totals: function(frm) {
        frm.doc.total_config_effort = 0;
        frm.doc.total_other_effort = 0;
        frm.doc.total_efforts = 0;
        frm.doc.total_customization_effort = 0;

        let module_tables = [
            "accounts_details", "buying_details", "stock_details", "crm_details", "payroll_details", "selling_details", "hrms_details", "projects_details", "manufacturing_details", "setup_details", "customization_details", "healthcare_details", "education_details",
        ];

        $.each(frm.doc.customization_estimations || [], function(i, d) {
            frm.doc.total_customization_effort += flt(d.estimated_time);
        });

        $.each(module_tables || [], function(i, module) {
            $.each(frm.doc[module] || [], function(i, row) {
                frm.doc.total_config_effort += flt(row.configuration_efforts);
                frm.doc.total_other_effort += flt(row.other_efforts);
            });
        });

        frm.doc.total_efforts = frm.doc.total_config_effort + frm.doc.total_other_effort + frm.doc.total_customization_effort;
        frm.refresh_field('total_config_effort');
        frm.refresh_field('total_other_effort');
        frm.refresh_field('total_efforts');
        frm.refresh_field('total_customization_effort');
    }
});

estimation_details_object = {
    configuration_efforts: function(frm) {
        frm.events.calculate_totals(frm);
    },
    other_efforts: function(frm) {
        frm.events.calculate_totals(frm);
    }
}

const modules = ["accounts_details", "buying_details", "stock_details", "crm_details", "payroll_details", "selling_details", "hrms_details", "projects_details", "manufacturing_details", "setup_details", "healthcare_details", "education_details"];

modules.forEach((module) => {
    estimation_details_object[module + "_remove"] = function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    }
}); 

frappe.ui.form.on('Estimation Detail', estimation_details_object);

frappe.ui.form.on('ERPNext Price Estimation', {
    total_hourly_rate: function(frm) {
        update_total_amount(frm);
    },
    total_efforts: function(frm) {
        update_total_amount(frm);
    }
});

function update_total_amount(frm) {
    let total = frm.doc.total_hourly_rate * frm.doc.total_efforts;
    frm.set_value('total_amount', total);
    frm.refresh_field('total_amount');
}

frappe.ui.form.on('ERPNext Price Estimation', {
    validity: function(frm) {
        update_amount(frm);
    },
    rate: function(frm) {
        update_amount(frm);
    }
});

function update_amount(frm) {
    let total = frm.doc.validity * frm.doc.rate;
    frm.set_value('amount', total);
    frm.refresh_field('amount');
}

frappe.ui.form.on('ERPNext Price Estimation', {
    amc_validity: function(frm) {
        update_amc_amount(frm);
    },
    amc_rate: function(frm) {
        update_amc_amount(frm);
    }
});

function update_amc_amount(frm) {
    let total = frm.doc.amc_validity * frm.doc.amc_rate;
    frm.set_value('amc_amount', total);
    frm.refresh_field('amc_amount');
}
