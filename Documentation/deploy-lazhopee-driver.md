# How to Deploy Lazhopee-Driver

## Description
- We use Nativescript framework ver.8.2 to create Lazhopee-Driver App to know more about Nativescript [click here](https://docs.nativescript.org/). 
- To run integration test  you need detox. to setup detox  [click here](https://docs.nativescript.org/plugins/detox.html#install-detox-command-line-tools-detox-cli).

## Go to Lazhopee-Driver Folder

```
cd Lazhopee-Driver
```
## Create Development env (.env)
```
BACKEND_URL =  http://172.18.42.65:3000 =>  type your ubuntu ip addr and add :3000
USERNAME = mejari => type your default usernme (optional)
PASSWORD = 12345  => type your default password (optional)
```
## Create Production env (.env.prod)
```
BACKEND_URL =  https://lazhopee.herokuapp.com => type your rest api here
USERNAME = ''
PASSWORD = ''
```

## Installation
```
npm install
```

## Running the app

#### Development
```
ns run android
```

#### Production mode
```
ns run android --env.env=prod
```

## Compiles and minifies for  generate aab file
```
ns build android  --bundle --env=prod --env.uglify --env.aot --env.snapshot  --release --key-store-path URLShortener.jks  --key-store-password 123456 --key-store-alias URLShortenerApp --key-store-alias-password 123456  --aab --copy-to LazhopeeDriver.aab
```

## Test

####  Integration Tests
```
detox build -c ios|android
detox test -c ios|android
```


