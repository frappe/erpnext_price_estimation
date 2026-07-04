## ERPNext Price Estimator

## 🚀 Introduction

This tool helps ERPNext implementation partners prepare structured and consistent implementation estimates. It enables estimation consultants to capture client requirements module-wise, review standard implementation tasks, and arrive at realistic effort estimates based on applicable scope.

## ✨ Key Features

1. **Task-based module masters** — each module contains predefined implementation tasks with scope details, involved DocTypes, and default effort estimates.
2. **Dynamic estimation** — selecting modules automatically loads relevant tasks into the estimation document, where partners can mark applicability and add client-specific tasks.
3. **Effort and cost calculation** — cumulative configuration effort, other effort, total hours, and cost are calculated based on applicable tasks and selected rates.
4. **Print format** — generate a structured estimation summary that can be shared with customers.
## 🛠 Installation

Using bench, [install ERPNext](https://github.com/frappe/bench#installation) as mentioned here.

Once ERPNext is installed, add PRM app to your bench by running

```sh
$ bench get-app erpnext_price_estimation
```

## 📘 User Guide

https://github.com/frappe/erpnext_price_estimation/assets/27720465/10d308af-af89-4152-ac37-aaf3344445f3


### 1. Estimation

Go to the "ERPNext Price Estimation" module, or create via awesomebar.

#### 1. Start a new estimate
![erpnext_price_estimate](https://github.com/user-attachments/assets/12bc6e42-7fbb-407d-b249-f5d31a74dc7d)




#### 2. Select the modules

Once you select the module, the estimate will be auto-updated. Edit as required.
![select_modules](https://github.com/user-attachments/assets/490e21eb-c1c7-4ec1-8ad3-08d950628be1)




#### 3. Add custom tasks if applicable
![custom task](https://github.com/user-attachments/assets/e229febe-7b9c-475e-a52c-73b05f5adffa)




#### 4. Set your hourly rate
![hourly_rate](https://github.com/user-attachments/assets/65d4f1ae-4bab-48c2-bbf1-cc4fe61df845)




#### 5. Add the Frappe Cloud details
![frappe_cloud](https://github.com/frappe/erpnext_price_estimation/assets/27720465/b6990e45-704c-404e-9d10-e007f5aab1c7)




#### 6. Add the AMC details

![amc](https://github.com/frappe/erpnext_price_estimation/assets/27720465/c00ccb1d-312d-4975-b567-5158711ca24f)




#### 7. Review and Save

### 2. Generating Print Formats

Go to the "Print Formats" section.
Select "Price Estimation PF"
Customize the print format if needed and generate the document.

## 🤝 Contributing

Please raise a pull request to add enhancements!

## 📜 License

MIT See [license.txt](https://github.com/frappe/partner_relationship_management/blob/main/license.txt) for more information.
