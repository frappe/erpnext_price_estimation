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

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/51f164b3-7c6f-4eea-8969-362c4647a6bc)

#### 2. Select the modules

Once you select the module, the estimate will be auto-updated. Edit as required.

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/374021c6-fcd4-4ea0-8913-974670c3a9be)

#### 3. Set your hourly rate

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/fa916efa-d358-4b84-995e-596a74ce25ee)

#### 4. Add the Frappe Cloud details

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/899a51ea-ef8e-44b1-813b-49a7d8a82f8d)

#### 5. Add the AMC Details:

![image](https://github.com/frappe/erpnext_price_estimation/assets/27720465/64c8a7a1-d53a-42b8-bc68-14b5d47cdf87)

#### 6. Review and Save

### 2. Generating Print Formats

Go to the "Print Formats" section.
Select "ERPNext Price Estimation - Compact."
Generating Detailed Print Format
In the "Print Formats" section, choose "ERPNext Price Estimation (Detailed)."
Customize the print format if needed and generate the document.

### 3. Changing the masters



## Contributing

Please raise a pull request to add enhancements!

## License

MIT See [license.txt](https://github.com/frappe/partner_relationship_management/blob/main/license.txt) for more information.
