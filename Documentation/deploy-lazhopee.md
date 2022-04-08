# How to Deploy Lazhopee

## Description
- We use Nativescript framework ver.8.2 to create Lazhopee App to know more about Nativescript [click here](https://docs.nativescript.org/). 
- To run integration test  you need detox. to setup detox  [click here](https://docs.nativescript.org/plugins/detox.html#install-detox-command-line-tools-detox-cli).

## Go to Lazhopee-Customer Folder
```
cd Lazhopee-Customer
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
 build android  --bundle --env=prod --env.uglify --env.aot --env.snapshot  --release --key-store-path URLShortener.jks  --key-store-password 123456 --key-store-alias URLShortenerApp --key-store-alias-password 123456  --aab --copy-to Lazhopee.aab
```

## Test

####  Integration Tests
```
detox build -c ios|android
detox test -c ios|android
```


