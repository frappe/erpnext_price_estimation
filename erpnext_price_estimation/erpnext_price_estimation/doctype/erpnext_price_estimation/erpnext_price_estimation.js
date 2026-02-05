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
    if (frm.doc.accounts) {
      add_efforts(frm, "accounts_details", "Accounts");
    } else {
      frm.clear_table("accounts_details");
      frm.refresh_field("accounts_details");
      calculate_total_efforts(frm);
    }
  },
  asset: function (frm) {
    if (frm.doc.asset) {
      add_efforts(frm, "asset_details", "Asset");
    } else {
      frm.clear_table("asset_details");
      frm.refresh_field("asset_details");
      calculate_total_efforts(frm);
    }
  },
  buying: function (frm) {
    if (frm.doc.buying) {
      add_efforts(frm, "buying_details", "Buying");
    } else {
      frm.clear_table("buying_details");
      frm.refresh_field("buying_details");
      calculate_total_efforts(frm);
    }
  },
  stock: function (frm) {
    if (frm.doc.stock) {
      add_efforts(frm, "stock_details", "Stock");
    } else {
      frm.clear_table("stock_details");
      frm.refresh_field("stock_details");
      calculate_total_efforts(frm);
    }
  },
  crm: function (frm) {
    if (frm.doc.crm) {
      add_efforts(frm, "crm_details", "CRM");
    } else {
      frm.clear_table("crm_details");
      frm.refresh_field("crm_details");
      calculate_total_efforts(frm);
    }
  },
  payroll: function (frm) {
    if (frm.doc.payroll) {
      add_efforts(frm, "payroll_details", "Payroll");
    } else {
      frm.clear_table("payroll_details");
      frm.refresh_field("payroll_details");
      calculate_total_efforts(frm);
    }
  },
  selling: function (frm) {
    if (frm.doc.selling) {
      add_efforts(frm, "selling_details", "Selling");
    } else {
      frm.clear_table("selling_details");
      frm.refresh_field("selling_details");
      calculate_total_efforts(frm);
    }
  },
  hrms: function (frm) {
    if (frm.doc.hrms) {
      add_efforts(frm, "hrms_details", "HRMS");
    } else {
      frm.clear_table("hrms_details");
      frm.refresh_field("hrms_details");
      calculate_total_efforts(frm);
    }
  },
  project: function (frm) {
    if (frm.doc.project) {
      add_efforts(frm, "project_details", "Project");
    } else {
      frm.clear_table("project_details");
      frm.refresh_field("project_details");
      calculate_total_efforts(frm);
    }
  },
  manufacturing: function (frm) {
    if (frm.doc.manufacturing) {
      add_efforts(frm, "manufacturing_details", "Manufacturing");
    } else {
      frm.clear_table("manufacturing_details");
      frm.refresh_field("manufacturing_details");
      calculate_total_efforts(frm);
    }
  },
  setup: function (frm) {
    if (frm.doc.setup) {
      add_efforts(frm, "setup_details", "Setup");
    } else {
      frm.clear_table("setup_details");
      frm.refresh_field("setup_details");
      calculate_total_efforts(frm);
    }
  },
  custom_task: function (frm) {
    calculate_total_efforts(frm);
    if (!frm.doc.custom_task) {
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

function add_efforts(frm, table, module) {
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

function calculate_total_efforts(frm) {
  frm.doc.total_config_effort = 0;
  frm.doc.total_other_effort = 0;
  frm.doc.total_combined_effort = 0;

  (task_modules || []).forEach((task_module) => {
    (frm.doc[task_module] || []).forEach((row) => {
      if (row.applicability == "Applicable") {
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
