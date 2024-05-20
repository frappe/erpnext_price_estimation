// Copyright (c) 2024, frappe solutions and contributors
// For license information, please see license.txt

frappe.ui.form.on('ERPNext Price Estimation', {
    accounts: function(frm) {
        if (frm.doc.accounts) {
            frm.events.add_efforts(frm, 'estimation_details_1', '', 'Accounts');
        } else {
            frm.clear_table("estimation_details_1");
            frm.refresh_field("estimation_details_1");
            frm.events.calculate_totals(frm);
        }
    },
    buying: function(frm) {
        if (frm.doc.buying) {
            frm.events.add_efforts(frm, 'estimation_details_2', '', 'Buying');
        } else {
            frm.clear_table("estimation_details_2");
            frm.refresh_field("estimation_details_2");
            frm.events.calculate_totals(frm);
        }
    },
    stock: function(frm) {
        if (frm.doc.stock) {
            frm.events.add_efforts(frm, 'estimation_details_3', '', 'Stock');
        } else {
            frm.clear_table("estimation_details_3");
            frm.refresh_field("estimation_details_3");
            frm.events.calculate_totals(frm);
        }
    },
    crm: function(frm) {
        if (frm.doc.crm) {
            frm.events.add_efforts(frm, 'estimation_details_4', '', 'CRM');
        } else {
            frm.clear_table("estimation_details_4");
            frm.refresh_field("estimation_details_4");
            frm.events.calculate_totals(frm);
        }
    },
    payroll: function(frm) {
        if (frm.doc.payroll) {
            frm.events.add_efforts(frm, 'estimation_details_5', '', 'Payroll');
        } else {
            frm.clear_table("estimation_details_5");
            frm.refresh_field("estimation_details_5");
            frm.events.calculate_totals(frm);
        }
    },
    selling: function(frm) {
        if (frm.doc.selling) {
            frm.events.add_efforts(frm, 'estimation_details_6', '', 'Selling');
        } else {
            frm.clear_table("estimation_details_6");
            frm.refresh_field("estimation_details_6");
            frm.events.calculate_totals(frm);
        }
    },
    hrms: function(frm) {
        if (frm.doc.hrms) {
            frm.events.add_efforts(frm, 'estimation_details_7', '', 'HR');
        } else {
            frm.clear_table("estimation_details_7");
            frm.refresh_field("estimation_details_7");
            frm.events.calculate_totals(frm);
        }
    },
    projects: function(frm) {
        if (frm.doc.projects) {
            frm.events.add_efforts(frm, 'estimation_details_8', '', 'Projects');
            debugger
        } else {
            frm.clear_table("estimation_details_8");
            frm.refresh_field("estimation_details_8");
            frm.events.calculate_totals(frm);
        }
    },
    manufacturing: function(frm) {
        if (frm.doc.manufacturing) {
            frm.events.add_efforts(frm, 'estimation_details_9', '', 'Manufacturing');
        } else {
            frm.clear_table("estimation_details_9");
            frm.refresh_field("estimation_details_9");
            frm.events.calculate_totals(frm);
        }
    },
    setup: function(frm) {
        if (frm.doc.setup) {
            frm.events.add_efforts(frm, 'estimation_details_10', '', 'Setup');
        } else {
            frm.clear_table("estimation_details_10");
            frm.refresh_field("estimation_details_10");
            frm.events.calculate_totals(frm);
        }
    },
    healthcare: function(frm) {
        if (frm.doc.healthcare) {
            frm.events.add_efforts(frm, 'estimation_details_11', '', 'Healthcare');
        } else {
            frm.clear_table("estimation_details_11");
            frm.refresh_field("estimation_details_11");
            frm.events.calculate_totals(frm);
        }
    },
     education: function(frm) {
        if (frm.doc.education) {
            frm.events.add_efforts(frm, 'estimation_details_12', '', 'Education');
        } else {
            frm.clear_table("estimation_details_12");
            frm.refresh_field("estimation_details_12");
            frm.events.calculate_totals(frm);
        }
    },
    refresh: function(frm) {
        let filter_map = {
            'select_process_1': 'Accounts',
            'select_process_2': 'Buying',
            'select_process_3': 'Stock',
            'select_process_4': 'CRM',
            'select_process_5': 'Payroll',
            'select_process_6': 'Selling',
            'select_process_7': 'HR',
            'select_process_8': 'Projects',
            'select_process_9': 'Manufacturing',
            'select_process_10': 'Setup',
            'select_process_11': 'Healthcare',
            'select_process_12': 'Education'
        };
        for (const [key, value] of Object.entries(filter_map)) {
            frm.set_query(key, () => {
                return {
                    filters: {
                        'module': value
                    }
                }
            });
        }
    },
    validate: function(frm){
        frm.events.calculate_totals(frm);
    },
    
    calculate_totals: function(frm) {
        frm.doc.total_config_effort = 0;
        frm.doc.total_other_effort = 0;
        frm.doc.total_efforts = 0;
        frm.doc.total_customization_effort = 0;
        
        let module_tables = ['estimation_details_1', 'estimation_details_2', 'estimation_details_3', 
        'estimation_details_4', 'estimation_details_5', 'estimation_details_6', 'estimation_details_7', 
        'estimation_details_8', 'estimation_details_9', 'estimation_details_10','estimation_details_11','estimation_details_12']; 
        
        $.each(cur_frm.doc.customization_estimations, function(i,d){
            frm.doc.total_customization_effort = flt(d.estimated_time) + frm.doc.total_customization_effort
        })
        
        $.each(module_tables || [], function(i, module) {
            $.each(frm.doc[module] || [], function(i, row) {
                frm.doc.total_config_effort += flt(row.configuration_efforts);
                frm.doc.total_other_effort += flt(row.other_efforts);
            });
        }); 
        
        frm.doc.total_efforts = frm.doc.total_config_effort + frm.doc.total_other_effort +  frm.doc.total_customization_effort;
        frm.refresh_field('total_config_effort');
        frm.refresh_field('total_other_effort');
        frm.refresh_field('total_efforts');
        frm.refresh_field('total_customization_effort');

    },
    add_efforts: function(frm, table, process, module) {
        frappe.call({
            'method': 'get_process_documents',
            'args': {
                'process': frm.doc[process],
                'module': module
            },
            'callback': function(r) {
                let current_list = [];
                $.each(frm.doc[table] || [], function(i, row) {
                    current_list.push(row.estimation_document);
                }) 
                $.each(r.message || [], function(i, row) {
                    if (!current_list.includes(row.document_name)) {
                        let item = frappe.model.add_child(frm.doc, 'Estimation Detail', table);
                        frappe.model.set_value(item.doctype, item.name, 'estimation_document', row.document_name);
                        frappe.model.set_value(item.doctype, item.name, 'estimation_process', row.process_name);
                        frappe.model.set_value(item.doctype, item.name, 'configuration_efforts', row.configuration_effort);
                        frappe.model.set_value(item.doctype, item.name, 'other_efforts', row.other_effort);
                    }
                });
                frm.refresh_field(table, '');
                if (process) {
                    frm.set_value(process, '');
                }
            }
        });
    },
    add_efforts_1: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_1', 'select_process_1');
    },
    add_efforts_2: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_2', 'select_process_2');
    },
    add_efforts_3: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_3', 'select_process_3');
    },
    add_efforts_4: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_4', 'select_process_4');
    },
    add_efforts_5: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_5', 'select_process_5');
    },
    add_efforts_6: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_6', 'select_process_6');
    },
    add_efforts_7: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_7', 'select_process_7');
    },
    add_efforts_8: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_8', 'select_process_8');
    },
    add_efforts_9: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_9', 'select_process_9');
    },
    add_efforts_10: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_10', 'select_process_10');
    },
     add_efforts_11: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_11', 'select_process_11');
    },
     add_efforts_12: function(frm) {
        frm.events.add_efforts(frm, 'estimation_details_12', 'select_process_12');
    },
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
    },
});