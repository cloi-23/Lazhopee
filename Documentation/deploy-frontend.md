# How to Deploy Frontend

## Description
- We use Nuxt 3 framework to create admin website to know more about Nuxt 3 [click here](https://nuxtjs.org/docs/get-started/installation). 
- To run integration test  you need cypress. to setup cyress  [click here](https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn).

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


