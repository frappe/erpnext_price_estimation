const task_modules = [
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
];

frappe.ui.form.on("ERPNext Price Estimation", {
  onload: function (frm) {
    frm.set_query("opportunity_from", function () {
      return {
        filters: {
          name: ["in", ["Customer", "Lead", "Prospect"]],
        },
      };
    });

    (task_modules || []).forEach((task_module) => {
      if (task_module !== "custom_tasks_details") {
        frm.set_df_property(task_module, "cannot_add_rows", true);
        frm.set_df_property(task_module, "cannot_delete_rows", true);
      }
    });
  },
});

frappe.ui.form.on("ERPNext Price Estimation", {
  accounts: function (frm) {
    toggle_table_details(frm, "accounts_details", "Accounts", frm.doc.accounts);
  },
  asset: function (frm) {
    toggle_table_details(frm, "asset_details", "Asset", frm.doc.asset);
  },
  buying: function (frm) {
    toggle_table_details(frm, "buying_details", "Buying", frm.doc.buying);
  },
  stock: function (frm) {
    toggle_table_details(frm, "stock_details", "Stock", frm.doc.stock);
  },
  crm: function (frm) {
    toggle_table_details(frm, "crm_details", "CRM", frm.doc.crm);
  },
  payroll: function (frm) {
    toggle_table_details(frm, "payroll_details", "Payroll", frm.doc.payroll);
  },
  selling: function (frm) {
    toggle_table_details(frm, "selling_details", "Selling", frm.doc.selling);
  },
  hrms: function (frm) {
    toggle_table_details(frm, "hrms_details", "HRMS", frm.doc.hrms);
  },
  project: function (frm) {
    toggle_table_details(frm, "project_details", "Project", frm.doc.project);
  },
  manufacturing: function (frm) {
    toggle_table_details(
      frm,
      "manufacturing_details",
      "Manufacturing",
      frm.doc.manufacturing
    );
  },
  setup: function (frm) {
    toggle_table_details(frm, "setup_details", "Setup", frm.doc.setup);
  },
  custom_tasks: function (frm) {
    if (frm.doc.custom_tasks) calculate_total_efforts(frm);
    else {
      frm.clear_table("custom_tasks_details");
      frm.refresh_field("custom_tasks_details");
      calculate_total_efforts(frm);
    }
  },
  validate: function (frm) {
    calculate_total_efforts(frm);
  },
});

frappe.ui.form.on("ERPNext Price Estimation", {
  total_hourly_rate: function (frm) {
    calculate_total_amount(frm);
  },
  total_combined_effort: function (frm) {
    calculate_total_amount(frm);
  },
});

frappe.ui.form.on("ERPNext Price Estimation", {
  cloud_validity: function (frm) {
    calculate_cloud_amount(frm);
  },
  cloud_rate: function (frm) {
    calculate_cloud_amount(frm);
  },
});

frappe.ui.form.on("ERPNext Price Estimation", {
  amc_validity: function (frm) {
    calculate_amc_amount(frm);
  },
  amc_rate: function (frm) {
    calculate_amc_amount(frm);
  },
});

frappe.ui.form.on("Estimation Detail", {
  default_configuration_effort: function (frm) {
    calculate_total_efforts(frm);
  },
  other_effort: function (frm) {
    calculate_total_efforts(frm);
  },
  applicability: function (frm) {
    calculate_total_efforts(frm);
  },
});

frappe.ui.form.on("Custom Estimation Detail", {
  default_configuration_effort: function (frm) {
    calculate_total_efforts(frm);
  },
  other_effort: function (frm) {
    calculate_total_efforts(frm);
  },
  applicability: function (frm) {
    calculate_total_efforts(frm);
  },
  custom_tasks_details_remove: function (frm) {
    calculate_total_efforts(frm);
  },
});

function populate_estimation_detail_tables(frm, table, module) {
  frappe.call({
    method:
      "erpnext_price_estimation.erpnext_price_estimation.doctype.erpnext_price_estimation.erpnext_price_estimation.get_task_documents",

    args: {
      module: module,
    },

    callback: function (r) {
      $.each(r.message || [], function (i, row) {
        let entry = frappe.model.add_child(frm.doc, "Estimation Detail", table);
        frappe.model.set_value(entry.doctype, entry.name, "task_id", row.name);
        frappe.model.set_value(
          entry.doctype,
          entry.name,
          "task",
          row.task_name
        );
        frappe.model.set_value(
          entry.doctype,
          entry.name,
          "task_reference",
          row.task_reference
        );
        frappe.model.set_value(
          entry.doctype,
          entry.name,
          "default_configuration_effort",
          row.default_configuration_effort
        );
        frappe.model.set_value(
          entry.doctype,
          entry.name,
          "other_effort",
          row.other_effort
        );
      });
      frm.refresh_field(table);
    },
  });
}

function toggle_table_details(frm, table, module, flag) {
  if (flag) {
    populate_estimation_detail_tables(frm, table, module);
  } else {
    frm.clear_table(table);
    frm.refresh_field(table);
  }
  calculate_total_efforts(frm);
}

function calculate_total_efforts(frm) {
  frm.doc.total_config_effort = 0;
  frm.doc.total_other_effort = 0;
  frm.doc.total_combined_effort = 0;

  (task_modules || []).forEach((task_module) => {
    (frm.doc[task_module] || []).forEach((row) => {
      if (row.applicability == "Applicable") {
        if ((row.default_configuration_effort * 10) % 5 !== 0) {
          if (task_module === "custom_tasks_details") {
            frappe.throw(
              `${task_module} Row ${row.idx}: overall effort must be in multiples of 0.5`
            );
          } else {
            frappe.throw(
              `${task_module} Row ${row.idx}: default configuration effort must be in multiples of 0.5`
            );
          }
        }
        if ((row.other_effort * 10) % 5 !== 0) {
          frappe.throw(
            `${task_module} Row ${row.idx}: other effort must be in multiples of 0.5`
          );
        }
        frm.doc.total_config_effort += flt(row.default_configuration_effort);
        frm.doc.total_other_effort += flt(row.other_effort);
      }
    });
  });

  frm.doc.total_combined_effort =
    frm.doc.total_config_effort + frm.doc.total_other_effort;
  frm.refresh_field("total_config_effort");
  frm.refresh_field("total_other_effort");
  frm.refresh_field("total_combined_effort");
  calculate_total_amount(frm);
}

function calculate_total_amount(frm) {
  let total = frm.doc.total_hourly_rate * frm.doc.total_combined_effort;
  frm.set_value("total_amount", total);
  frm.refresh_field("total_amount");
}

function calculate_cloud_amount(frm) {
  let total = frm.doc.cloud_validity * frm.doc.cloud_rate;
  frm.set_value("cloud_amount", total);
  frm.refresh_field("cloud_amount");
}

function calculate_amc_amount(frm) {
  let total = frm.doc.amc_validity * frm.doc.amc_rate;
  frm.set_value("amc_amount", total);
  frm.refresh_field("amc_amount");
}
