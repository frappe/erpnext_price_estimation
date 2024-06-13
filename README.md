## ERPNext Price Estimation

## 🚀 Introduction

This tool helps ERPNext implementors create a standardised quote. This tool will help a sales / estimation consultant to ask the right question to scope a standard / vanilla implementation. This tool will help you estimate the number of hours. You can choose your own rates.

## ✨ Key Features

1. Pre-built module masters - list of all tasks associated with implementing a module
2. Estimation - estimate for a particular customer
3. Print Format - to present to the customer

## 🛠 Installation

Using bench, [install ERPNext](https://github.com/frappe/bench#installation) as mentioned here.

Once ERPNext is installed, add PRM app to your bench by running

```sh
$ bench get-app erpnext_price_estimation https://github.com/frappe/erpnext_price_estimation.git
```

## 📘 User Guide

https://github.com/frappe/erpnext_price_estimation/assets/27720465/10d308af-af89-4152-ac37-aaf3344445f3


### 1. Estimation

Go to the "ERPNext Price Estimation" module, or create via awesomebar.

#### 1. Start a new estimate
![erpnext_price_estimate](https://github.com/frappe/erpnext_price_estimation/assets/27720465/87e15383-33b9-4890-8470-ec2cbb6c0f64)



#### 2. Select the modules

Once you select the module, the estimate will be auto-updated. Edit as required.
![select_modules](https://github.com/frappe/erpnext_price_estimation/assets/27720465/e8f36a9d-136d-4675-9b4d-550bd469a17b)




#### 3. Set your hourly rate
![hourly_rate](https://github.com/frappe/erpnext_price_estimation/assets/27720465/48760442-a1cb-4435-aeef-d0adf235c875)




#### 4. Add the Frappe Cloud details
![frappe_cloud](https://github.com/frappe/erpnext_price_estimation/assets/27720465/b6990e45-704c-404e-9d10-e007f5aab1c7)




#### 5. Add the AMC details

![amc](https://github.com/frappe/erpnext_price_estimation/assets/27720465/c00ccb1d-312d-4975-b567-5158711ca24f)





#### 6. Review and Save

### 2. Generating Print Formats

Go to the "Print Formats" section.
Select "ERPNext Price Estimation"
![ERPNext_Price_Estimate_1](https://github.com/frappe/erpnext_price_estimation/assets/27720465/dcebd259-211c-4438-b462-5bbb1d0900f6)

![ERPNext_Price_Estimate_2](https://github.com/frappe/erpnext_price_estimation/assets/27720465/3cbf8975-d46f-4fce-8e1e-7c90e51e30c0)




Customize the print format if needed and generate the document.

### 3. Changing the masters
New modules,Estimation Process, Estimation Document  can be added and modified as required.

Modules:
![new_module](https://github.com/frappe/erpnext_price_estimation/assets/27720465/cdcaf4e8-87d0-40bc-ac8f-0116bb0a4b25)


Estimation Process:
![estimation_process](https://github.com/frappe/erpnext_price_estimation/assets/27720465/1c1198de-c411-4386-b7ec-ed1bf17c91cc)


Estimation Document:
Estimation Document corresponding to the Estimation Document can be added /modified.
![estimation_doc](https://github.com/frappe/erpnext_price_estimation/assets/27720465/80f667a7-1384-465d-b2a0-d71a51bf0588)


Note: Estimation Process Needs to be added for the Setup, Customization Module as per the requirement.

## 🤝 Contributing

Please raise a pull request to add enhancements!

## 📜 License

MIT See [license.txt](https://github.com/frappe/partner_relationship_management/blob/main/license.txt) for more information.
