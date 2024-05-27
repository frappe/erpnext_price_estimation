## ERPNext Price Estimation

## Introduction

This tool helps ERPNext implementors create a standardised quote. This tool will help a sales / estimation consultant to ask the right question to scope a standard / vanilla implementation. This tool will help you estimate the number of hours. You can choose your own rates.

## Key Features

1. Pre-built module masters - list of all tasks associated with implementing a module
2. Estimation - estimate for a particular customer
3. Print Format - to present to the customer

## Installation

Using bench, [install ERPNext](https://github.com/frappe/bench#installation) as mentioned here.

Once ERPNext is installed, add PRM app to your bench by running

```sh
$ bench get-app erpnext_price_estimation https://github.com/frappe/erpnext_price_estimation.git
```

## User Guide

### 1. Estimation

Go to the "ERPNext Price Estimation" module, or create via awesomebar.

#### 1. Start a new estimate
![1](https://github.com/frappe/erpnext_price_estimation/assets/27720465/082aba0b-61f1-424d-9779-bd04419bd31e)



#### 2. Select the modules

Once you select the module, the estimate will be auto-updated. Edit as required.

![2](https://github.com/frappe/erpnext_price_estimation/assets/27720465/7e9d11c3-1cd2-4951-ade3-32d5dbbe7286)

#### 3. Set your hourly rate

![3](https://github.com/frappe/erpnext_price_estimation/assets/27720465/39073eb9-858f-4b34-8f7c-0fe6ccfe5ad9)


#### 4. Add the Frappe Cloud details
![4](https://github.com/frappe/erpnext_price_estimation/assets/27720465/dd7e77c2-1f41-4ea6-87a0-e83feb4fd422)


#### 5. Add the AMC details

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/64c8a7a1-d53a-42b8-bc68-14b5d47cdf87)

#### 6. Review and Save

### 2. Generating Print Formats

Go to the "Print Formats" section.
Select "ERPNext Price Estimation - Compact."
Generating Detailed Print Format
In the "Print Formats" section, choose "ERPNext Price Estimation (Detailed)."
Customize the print format if needed and generate the document.

### 3. Changing the masters
New modules,Estimation Process, Estimation Document  can be added as required.
Modules:
![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/40b75d42-cfb0-4b62-8ab1-ce24e75f5a8f)

Estimation Process:
![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/d760c335-1672-477c-acb2-59b92193e8b8)

Estimation Document:
Estimation Document corresponding to the Estimation Document can be added.
![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/7fd8a2d5-f287-4e23-9c69-e93d7ce73c40)







## Contributing

Please raise a pull request to add enhancements!

## License

MIT See [license.txt](https://github.com/frappe/partner_relationship_management/blob/main/license.txt) for more information.
