# How to Deploy Backend

## Description
We use Nest framework to create Rest API to know more about NestJS [click here](https://docs.nestjs.com/).

## Go to Backend Folder
```
cd backend
```
## Create Development env (.env)
```
DATABASE_URL =  'mongodb://localhost:27018/Lazhopee' =>  type your mongodb connection

```
## Create Production env (.env)  * Change DATABASE_URL link of your cloud mongodb connection
```
DATABASE_URL =  'mongodb+srv://lazhopee:GodTNWdBDQjbEWik@lazhopee.um1by.mongodb.net/Lazhopee?retryWrites=true&w=majority' => type your cloud mongodb connection
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


