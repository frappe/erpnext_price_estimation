## ERPNext Price Estimation

### Introduction

ERPNext Price Estimation is a new custom app which helps the Partners to estimate the total configuration efforts. 
### Key Features


By integrating with [ERPNext](https://github.com/frappe/erpnext), feature extensibility for estimating the configuration efforts. Meanwhile the [Frappe Framework](https://github.com/frappe/frappe) powers extensibility in terms of authentication and role based access permissions, notifications, workflows, emails and a lot more.

### Installation

Using bench, [install ERPNext](https://github.com/frappe/bench#installation) as mentioned here.

Once ERPNext is installed, add PRM app to your bench by running

```sh
$ bench get-app partner_relationship_management https://github.com/frappe/partner_relationship_management
```

After that, you can install PRM app on the required site by running

```sh
$ bench --site demo.com install-app partner_relationship_management
```

### Documentation

who would be accessing this app: Partners for managing the partners. Separate manuals for these 2 user journies are available here:

#### License

MIT See [license.txt](https://github.com/frappe/partner_relationship_management/blob/main/license.txt) for more information.
