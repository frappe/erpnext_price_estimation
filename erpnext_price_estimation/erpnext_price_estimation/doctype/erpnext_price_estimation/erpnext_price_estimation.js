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
            add_efforts(frm, 'estimation_details_1', 'Accounts');
        } else {
            frm.clear_table("estimation_details_1");
            frm.refresh_field("estimation_details_1");
            frm.events.calculate_totals(frm);
        }
    },
    buying: function(frm) {
        if (frm.doc.buying) {
            add_efforts(frm, 'estimation_details_2', 'Buying');
        } else {
            frm.clear_table("estimation_details_2");
            frm.refresh_field("estimation_details_2");
            frm.events.calculate_totals(frm);
        }
    },
    stock: function(frm) {
        if (frm.doc.stock) {
            add_efforts(frm, 'estimation_details_3', 'Stock');
        } else {
            frm.clear_table("estimation_details_3");
            frm.refresh_field("estimation_details_3");
            frm.events.calculate_totals(frm);
        }
    },
    crm: function(frm) {
        if (frm.doc.crm) {
            add_efforts(frm, 'estimation_details_4', 'CRM');
        } else {
            frm.clear_table("estimation_details_4");
            frm.refresh_field("estimation_details_4");
            frm.events.calculate_totals(frm);
        }
    },
    payroll: function(frm) {
        if (frm.doc.payroll) {
            add_efforts(frm, 'estimation_details_5', 'Payroll');
        } else {
            frm.clear_table("estimation_details_5");
            frm.refresh_field("estimation_details_5");
            frm.events.calculate_totals(frm);
        }
    },
    selling: function(frm) {
        if (frm.doc.selling) {
            add_efforts(frm, 'estimation_details_6', 'Selling');
        } else {
            frm.clear_table("estimation_details_6");
            frm.refresh_field("estimation_details_6");
            frm.events.calculate_totals(frm);
        }
    },
    hrms: function(frm) {
        if (frm.doc.hrms) {
            add_efforts(frm, 'estimation_details_7', 'HR');
        } else {
            frm.clear_table("estimation_details_7");
            frm.refresh_field("estimation_details_7");
            frm.events.calculate_totals(frm);
        }
    },
    projects: function(frm) {
        if (frm.doc.projects) {
            add_efforts(frm, 'estimation_details_8', 'Projects');
        } else {
            frm.clear_table("estimation_details_8");
            frm.refresh_field("estimation_details_8");
            frm.events.calculate_totals(frm);
        }
    },
    manufacturing: function(frm) {
        if (frm.doc.manufacturing) {
            add_efforts(frm, 'estimation_details_9', 'Manufacturing');
        } else {
            frm.clear_table("estimation_details_9");
            frm.refresh_field("estimation_details_9");
            frm.events.calculate_totals(frm);
        }
    },
    setup: function(frm) {
        if (frm.doc.setup) {
            add_efforts(frm, 'estimation_details_10', 'Setup');
        } else {
            frm.clear_table("estimation_details_10");
            frm.refresh_field("estimation_details_10");
            frm.events.calculate_totals(frm);
        }
    },
    healthcare: function(frm) {
        if (frm.doc.healthcare) {
            add_efforts(frm, 'estimation_details_11', 'Healthcare');
        } else {
            frm.clear_table("estimation_details_11");
            frm.refresh_field("estimation_details_11");
            frm.events.calculate_totals(frm);
        }
    },
    education: function(frm) {
        if (frm.doc.education) {
            add_efforts(frm, 'estimation_details_12', 'Education');
        } else {
            frm.clear_table("estimation_details_12");
            frm.refresh_field("estimation_details_12");
            frm.events.calculate_totals(frm);
        }
    },
    customization: function(frm) {
        if (frm.doc.customization) {
            add_efforts(frm, 'estimation_details_13', 'Customization');
        } else {
            frm.clear_table("estimation_details_13");
            frm.refresh_field("estimation_details_13");
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
            'estimation_details_1', 'estimation_details_2', 'estimation_details_3',
            'estimation_details_4', 'estimation_details_5', 'estimation_details_6',
            'estimation_details_7', 'estimation_details_8', 'estimation_details_9',
            'estimation_details_10', 'estimation_details_11', 'estimation_details_12'
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

frappe.ui.form.on('Estimation Detail', {
    configuration_efforts: function(frm) {
        frm.events.calculate_totals(frm);
    },
    other_efforts: function(frm) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_1_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_2_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_3_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_4_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_5_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_6_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_7_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_8_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_9_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_10_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_11_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    },
    estimation_details_12_remove: function(frm, cdt, cdn) {
        frm.events.calculate_totals(frm);
    }
});

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
