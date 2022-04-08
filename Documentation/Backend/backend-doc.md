# Backend Documentation
## [Get started](#README)
1. [Overview](#Overview)
2. [README](#README)
3. [Dependencies](#Dependencies)
4. [File and Description](#File-and-Description)

# Overview
## Lazhopee Entity Relationship Diagram (ERD)
<img src="https://github.com/MEJARICLOI/Lazhopee/blob/main/Documentation/Backend/erd.png" width="100%">

## Why we use Nestjs?
### Few of the great features by NestJS.
Nest.js was created to help developers create Monoliths and Microservices.
It’s simple to use, quick to learn, and easy to apply
It leverages TypeScript — strongly typed language which is a superset of JavaScript
Powerful Command Line Interface (CLI) to boost productivity and ease of development
Support for dozens of nest-specific modules that help you easily integrate with common technologies and concepts like Type ORM, Mongoose, GraphQL, Logging, Validation, Caching, WebSockets, and much more
Easy unit-testing applications
Great documentation.
Built for large-scale enterprise applications.
…and it never ends.

# README
## Go to Backend Folder
```
cd backend
```
## Installation
```
npm install
```

## Running the app

#### Development
```
npm run start
```
#### Watch mode
```
npm run start:dev
```
#### Production mode
```
npm run start:prod
```

## Test

####  e2e Tests
```
npm run test:e2e
```

# Dependencies
* @nestjs-modules/mailer : ^1.6.1
* @nestjs/common : ^8.0.0
* @nestjs/config : ^2.0.0
* @nestjs/core : ^8.0.0
* @nestjs/jwt : ^8.0.0
* @nestjs/mapped-types : ^1.0.1
* @nestjs/mongoose : ^9.0.2
* @nestjs/passport : ^8.2.1
* @nestjs/platform-express : ^8.0.0
* @nestjs/platform-fastify : ^8.4.2
* assert : ^2.0.0
* bcrypt : ^5.0.1
* class-transformer : ^0.5.1
* class-validator : ^0.13.2
* cookie-parser : ^1.4.6
* date-fns : ^2.28.0
* dotenv : ^16.0.0
* express : ^4.17.3
* fastify-cookie : ^5.6.0
* handlebars : ^4.7.7
* mongoose : ^6.2.6
* nestjs-url-generator : ^1.0.1
* nodemailer : ^6.7.3
* passport-jwt : ^4.0.0
* passport-local : ^1.0.0
* reflect-metadata : ^0.1.13
* rimraf : ^3.0.2
* rxjs : ^7.2.0

# File and Description
| File| Description 
---| ---|
[bacend/public/uploads](https://github.com/MEJARICLOI/Lazhopee/tree/main/backend/public/uploads)  | Storage for uploaded images
[backend/src/common/dto/pagination.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/common/dto/pagination.dto.ts) | DTO for pagination
[backend/src/customer/auth/guard/jwt-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/auth/guard/jwt-auth.guard.ts) |  JWT Guard configuration for customer
[backend/src/customer/auth/guard/local-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/auth/guard/local-auth.guard.ts)  |  Local Guard configuration for customer
[backend/src/customer/auth/strategy/jwt.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/auth/strategy/jwt.strategy.ts) |  JWT Strategy configuration for customer
[backend/src/customer/auth/strategy/local.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/auth/strategy/local.strategy.ts) |  Local Strategy configuration for customer
[backend/src/customer/dto/create-customer.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/dto/create-customer.dto.ts) |  DTO for creating customer
[backend/src/customer/dto/login-cutomer.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/dto/login-cutomer.dto.ts) |  DTO for login customer
[backend/src/customer/dto/update-customer.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/dto/update-customer.dto.ts) |  DTO for updating customer
[backend/src/customer/entities/customer.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/entities/customer.entity.ts) |  Use to create customer model
[backend/src/customer/mailer/service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/mailer/service.ts) | Mailer configuration 
[backend/src/customer/utils/brcrypt.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/utils/brcrypt.ts) | Brcrypt configuration for customer password
[backend/src/customer/customer.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/customer.controller.ts) | Controller for customer
[backend/src/customer/customer.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/customer.module.ts) | Module for customer
[backend/src/customer/customer.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/customer/customer.service.ts) | Service for customer
[backend/src/delivery/auth/guard/jwt-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/auth/guard/jwt-auth.guard.ts) |  JWT Guard configuration for delivery
[backend/src/delivery/auth/guard/local-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/auth/guard/local-auth.guard.ts) |  Local Guard configuration for delivery
[backend/src/delivery/auth/strategy/jwt.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/tree/main/backend/src/delivery/auth/strategy) |  JWT Strategy configuration for delivery
[backend/src/delivery/entities/delivery.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/entities/delivery.entity.ts) |  Use to create delivery model
[backend/src/delivery/delivery.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/delivery.controller.ts)  | Controller for delivery
[backend/src/delivery/delivery.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/delivery.module.ts) | Module for delivery
[backend/src/delivery/delivery.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/delivery/delivery.service.ts) | Service for delivery
[backend/src/driver/auth/guard/jwt-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/auth/guard/jwt-auth.guard.ts)  |  JWT Guard configuration for driver
[backend/src/driver/auth/guard/local-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/auth/guard/local-auth.guard.ts) |  Local Guard configuration for driver
[backend/src/driver/auth/strategy/jwt.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/auth/strategy/jwt.strategy.ts) |  JWT Strategy configuration for driver
[backend/src/driver/auth/strategy/local.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/auth/strategy/local.strategy.ts) |  Local Strategy configuration for driver
[backend/src/driver/dto/create-driver.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/dto/create-driver.dto.ts) |  DTO for creating driver
[backend/src/driver/dto/login-driver.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/dto/login-driver.dto.ts)  |  DTO for login driver
[backend/src/driver/dto/update-driver.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/dto/update-driver.dto.ts) |  DTO for updating driver
[backend/src/driver/entities/drivers.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/entities/drivers.entity.ts)  |  Use to create driver model
[backend/src/driver/utils/brcrypt.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/utils/brcrypt.ts) | Brcrypt configuration for driver password
[backend/src/driver/driver.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/driver.controller.ts) | Controller for driver
[backend/src/driver/driver.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/driver.module.ts) | Module for driver
[backend/src/driver/driver.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/driver/driver.service.ts) | Service for driver
[backend/src/expense/dto/create-expense.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/dto/create-expense.dto.ts) |  DTO for creating expense
[backend/src/expense/dto/update-expense.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/dto/update-expense.dto.ts) |  DTO for updating expense
[backend/src/expense/entity/expense.enitity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/entity/expense.enitity.ts) |  Use to create expense model
[backend/src/expense/expense.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/expense.controller.ts) | Controller for expense
[backend/src/expense/expense.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/expense.module.ts) | Module for expense
[backend/src/expense/expense.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/expense/expense.service.ts) | Service for expense
[backend/src/income-statement/income-statement.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/income-statement/income-statement.controller.ts) | Controller for income-statement
[backend/src/income-statement/income-statement.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/income-statement/income-statement.module.ts) | Module for income-statement
[backend/src/income-statement/income-statement.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/income-statement/income-statement.service.ts) | Service for income-statement
[backend/src/manager/auth/guard/jwt-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/auth/guard/jwt-auth.guard.ts) |  JWT Guard configuration for manager
[backend/src/manager/auth/guard/local-auth.guard.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/auth/guard/local-auth.guard.ts) |  Local Guard configuration for manager
[backend/src/manager/auth/strategy/jwt.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/auth/strategy/jwt.strategy.ts) |  JWT Strategy configuration for manager
[backend/src/manager/auth/strategy/local.strategy.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/auth/strategy/local.strategy.ts) |  Local Strategy configuration for manager
[backend/src/manager/dto/create-manager.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/dto/create-manager.dto.ts) |  DTO for creating manager
[backend/src/manager/dto/login-manager.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/dto/login-manager.dto.ts)  | DTO for login manager
[backend/src/manager/dto/update-manager.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/dto/update-manager.dto.ts) |  DTO for updating manager
[backend/src/manager/entities/manager.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/entities/manager.entity.ts) |  Use to create manager model
[backend/src/manager/utils/brcrypt.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/utils/brcrypt.ts)  | Brcrypt configuration for manager password
[backend/src/manager/manager.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/manager.controller.ts) | Controller for manager
[backend/src/manager/manager.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/manager.module.ts) | Module for manager
[backend/src/manager/manager.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/manager/manager.service.ts) | Service for manager
[backend/src/order/dto/articles-dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/dto/articles-dto.ts) |  DTO for creating articles
[backend/src/order/dto/create-order.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/dto/create-order.dto.ts)  |  DTO for creating order
[backend/src/order/dto/update-order.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/dto/update-order.dto.ts) |  DTO for updating order
[backend/src/order/entities/order.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/entities/order.entity.ts) |  Use to create order model
[backend/src/order/order.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/order.controller.ts)  | Controller for order
[backend/src/order/order.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/order.module.ts) | Module for order
[backend/src/order/order.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/order/order.service.ts) | Service for order
[backend/src/product/dto/create-product.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/dto/create-product.dto.ts) |  DTO for creating product
[backend/src/product/dto/update-product-dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/dto/update-product-dto.ts) |  DTO for updating product
[backend/src/product/entity/product.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/entity/product.entity.ts) |  Use to create product model
[backend/src/product/product.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/product.controller.ts) | Controller for product
[backend/src/product/product.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/product.module.ts) | Module for product
[backend/src/product/product.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/product/product.service.ts) | Service for product
[backend/src/purchase/dto/articles.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/dto/articles.dto.ts)  |  DTO for creating articles
[backend/src/purchase/dto/create-purchase.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/dto/create-purchase.dto.ts) |  DTO for creating purchase
[backend/src/purchase/dto/update-purchase.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/dto/update-purchase.dto.ts) |  DTO for updating purchase
[backend/src/purchase/entity/purchase.enity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/entity/purchase.enity.ts) |  Use to create purchase model
[backend/src/purchase/purchase.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/purchase.controller.ts) | Controller for purchase
[backend/src/purchase/purchase.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/purchase.module.ts) | Module for purchase
[backend/src/purchase/purchase.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/purchase/purchase.service.ts) | Service for purchase
[backend/src/sale/sale.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/sale/sale.controller.ts) | Controller for sale
[backend/src/sale/sale.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/sale/sale.module.ts) | Module for sale
[backend/src/sale/sale.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/sale/sale.service.ts) | Service for sale
[backend/src/store/dto/create-store.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/dto/create-store.dto.ts)  |  DTO for creating store
[backend/src/store/dto/update-store.dto.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/dto/update-store.dto.ts) |  DTO for updating store
[backend/src/store/entity/store.entity.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/entity/store.entity.ts)  |  Use to create store model
[backend/src/store/store.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/store.controller.ts) | Controller for store
[backend/src/store/store.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/store.module.ts) | Module for store
[backend/src/store/store.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/store/store.service.ts) | Service for store
[backend/src/upload/upload.controller.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/upload/upload.controller.ts) | Controller for uploading image
[backend/src/upload/upload.module.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/upload/upload.module.ts) | Module for  uploading image
[backend/src/upload/upload.service.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/src/upload/upload.service.ts) | Service for  uploading image
[backend/test/customer/customer.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/customer/customer.e2e-spec.ts) | e2e test for customer
[backend/test/delivery/delivery.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/delivery/delivery.e2e-spec.ts) | e2e test for delivery
[backend/test/driver/driver.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/driver/driver.e2e-spec.ts) | e2e test for driver
[backend/test/expense/expense.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/expense/expense.e2e-spec.ts) | e2e test for expense
[backend/test/incomeStatement/incomeStatement.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/incomeStatement/incomeStatement.e2e-spec.ts) | e2e test for income statement
[backend/test/manager/manager.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/manager/manager.e2e-spec.ts) | e2e test for manager
[backend/test/order/order.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/order/order.e2e-spec.ts) | e2e test for order
[backend/test/product/product.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/product/product.e2e-spec.ts) | e2e test for product
[backend/test/purchase/purchase.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/purchase/purchase.e2e-spec.ts) | e2e test for purchase
[backend/test/sale/sale.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/sale/sale.e2e-spec.ts) | e2e test for sale
[backend/test/store/store.e2e-spec.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/test/store/store.e2e-spec.ts) | e2e test for store
[backend/docker-compose.yml](https://github.com/MEJARICLOI/Lazhopee/blob/main/backend/docker-compose.yml) | Docker Cofiguration for backend


