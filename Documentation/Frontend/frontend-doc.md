# Frontend Documentation
## [Get started](#README)
1. [Overview](#Overview)
2. [README](#README)
3. [Dependencies](#Dependencies)
4. [File and Description](#File-and-Description)

# Overview
## Why we use Nuxtjs?
* Easy setup using the command-line with the starter template
* It’s great for SEO: it solves all the SEO issues that single-page apps are reputed for (client-rendered content, mobile web performance, URL and routing, etc.)
* It provides an opinionated structure and setup.
* automatic code-splitting.
* It can create universal apps without hassle


# README
## Go to Frontend Folder

```
cd frontend
```

## Create Development env (.env)
```
BACKEND_URL =  http://172.18.42.65:3000 =>  type your ubuntu ip addr and add :3000

```
## Create Production env (.env)  * Change BACKEND_URL link of your rest api 
```
BACKEND_URL =  https://lazhopee.herokuapp.com => type your rest api here
```

## Installation
```
npm install
```

## Running the app

#### Development
```
npm run dev
```

## Compiles and minifies for production
```
npm run build
```

## Test

####  Integration Tests
```
npm run cypress
```


# Dependencies
* @nestjs-modules/mailer: ^1.6.1
* @nuxtjs/auth-next: ^5.0.0-1647967358.de1bb0f
* @pinia/nuxt: ^0.1.8
* @vueuse/head": ^0.7.5
* axios: ^0.26.1
* chart.js: ^3.7.1
* cookie-universal-nuxt: ^2.1.5
* date-fns: ^2.28.0
* dinero.js: ^1.9.1
* dotenv: ^16.0.0
* faker: ^6.6.6
* h3: ^0.4.2
* nodemailer: ^6.7.3
* pinia: ^2.0.12
* vue: ^3.2.31
* vue-chart-3: ^3.1.8
* vue-head: ^2.2.0

# File and Description
 |  File |  Description 
---|  ---| 
[frontend\assets](https://github.com/MEJARICLOI/Lazhopee/tree/main/frontend/assets)  |  Add the bootstrap, css file 
[frontend\components\CurrencyFormatter.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/CurrencyFormatter.vue)  | Format the currency for recommended country
[frontend\components\DateFormatter.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/DateFormatter.vue) | Format the representing date
[frontend\components\IncomeStatementList.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/IncomeStatementList.vue)  | Checking computation for profit and loss
[frontend\components\LineChartTemplate.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/LineChartTemplate.vue)  | Line Graph it shows the sales for a specified time
[frontend\components\ListPurchase.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/ListPurchase.vue)  | List down all purchased
[frontend\components\NavbarList.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/NavbarList.vue)  | Navigation bar for navigating per page
[frontend\components\PieChart.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/PieChart.vue) | Pie Graph shows types of products sold for a specified time
[frontend\components\SelectProduct.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/SelectProduct.vue)  | Product selection for purchasing
[frontend\components\SelectStore.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/components/SelectStore.vue)	 | Store selection for adding a product
[frontend\composables\useJwtToken.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/composables/useJwtToken.ts)  | Function for adding Header Authorization per axios request
[frontend\composables\useMonth.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/composables/useMonth.ts)  | Function for automation of start and end date on graph
[frontend\cypress\integration\add_driver.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/add_driver.spec.js)  | Test for adding a driver
[frontend\cypress\integration\assign_order.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/assign_order.spec.js)  | Test for assigning order to driver
[frontend\cypress\integration\create-store-and-product.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/create-store-and-product.spec.js)  | Test for adding store and product
[frontend\cypress\integration\income_statement.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/income_statement.spec.js)  | Test for computing income statement
[frontend\cypress\integration\line_chart.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/line_chart.spec.js) | Test for checking if the data in line chart is accurate
[frontend\cypress\integration\pie_chart.spec.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/integration/pie_chart.spec.js)  | Test for checking if the data in pie chart is accurate
[frontend\cypress\fixtures\driver.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/driver.json) | Mockdata for driver
[frontend\cypress\fixtures\expense.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/expense.json) | Mockdata for expense
[frontend\cypress\fixtures\orders.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/orders.json) | Mockdata for orders
[frontend\cypress\fixtures\product.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/product.json) | Mockdata for product
[frontend\cypress\fixtures\purchase.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/purchase.json) | Mockdata for purchase
[frontend\cypress\fixtures\stores.json](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/fixtures/stores.json) | Mockdata for stores
[frontend\cypress\support\commands.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/commands.js)  | Login  with existing data from the database
[frontend\cypress\support\driver.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/driver.js)  | Adding random drivers
[frontend\cypress\support\expense.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/expense.js)  | Adding random expense
[frontend\cypress\support\index.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/index.js)  | Import each existing file for command
[frontend\cypress\support\order.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/order.js)  | Adding random order with existing customer from the database
[frontend\cypress\support\product.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/product.js)  | Adding random product
[frontend\cypress\support\purchase.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/purchase.js)  | Adding random purchase
[frontend\cypress\support\staticOrder.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/staticOrder.js)  | Adding order with existing product and customer data from the database
[frontend\cypress\support\store.js](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/cypress/support/store.js)  | Adding random store
[frontend\layouts\default.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/layouts/default.vue)  | The default page with navigation bar
[frontend\layouts\login.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/layouts/login.vue)  | To set a login page in index
[frontend\pages\customer\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/customer/index.vue)  | To see the Name, Address, Contact, Username & Email of a customer
[frontend\pages\driver\id.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/driver/%5Bid%5D.vue) | To see only 1 driver
[frontend\pages\driver\add.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/driver/add.vue) | For Adding a driver
[frontend\pages\driver\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/driver/index.vue)  | To see the Photo, Name, Contact & Address of a driver
[frontend\pages\expense\add.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/expense/add.vue) | For recording expense
[frontend\pages\expense\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/expense/index.vue)  | To see the Name, Cost & Date of expense
[frontend\pages\incomeStatement\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/incomeStatement/index.vue) | Checking computation for profit and loss
[frontend\pages\product\id.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/product/%5Bid%5D.vue)  | To see only 1 product
[frontend\pages\product\add.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/product/add.vue)  | For Adding new product
[frontend\pages\product\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/product/index.vue)  | To see the Name, Category, store & Selling Price of a product
[frontend\pages\purchase\id.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/purchase/%5Bid%5D.vue) | To see only 1 purchase within a day & total
[frontend\pages\purchase\add.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/purchase/add.vue)  | For recording purchase
[frontend\pages\purchase\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/purchase/index.vue) | To see Store & Date of purchase
[frontend\pages\shipment\id.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/shipment/%5Bid%5D.vue)  | To see 1 order details
[frontend\pages\shipment\delivered.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/shipment/delivered.vue)  | To see if success or failed parcel delivered
[frontend\pages\shipment\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/shipment/index.vue)  | Default page for shipment if no dropdown list selected
[frontend\pages\shipment\pending.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/shipment/pending.vue) | To see pending & to assign orders
[frontend\pages\shipment\shipping.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/shipment/shipping.vue)  | To see shipping & to update driver for orders
[frontend\pages\store\add.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/store/add.vue)  | Add new store
[frontend\pages\store\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/store/index.vue) | To See List of stores
[frontend\pages\dashboard.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/dashboard.vue)  | The default page after successfully login
[frontend\pages\index.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/index.vue) | The Login page of the website
[frontend\app.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/app.vue)  | default page for all
[frontend\pages\test\order.vue](https://github.com/MEJARICLOI/Lazhopee/blob/main/frontend/pages/test/order.vue)  | This is use for Cypress to order and assign Success status

