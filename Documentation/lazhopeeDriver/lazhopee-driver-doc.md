# Lazhopee Driver Documentation
## [Get started](#README)
1. [Overview](#Overview)
2. [README](#README)
3. [Dependencies](#Dependencies)
4. [File and Description](#File-and-Description)

# Overview
## Why we use NativeScript?
NativeScript is a free and open-source framework for developing mobile applications. It is used to build truly native mobile apps using JavaScript. You can easily develop a native UI and higher-performance apps for your iOS and Android platforms

## Uses of NativeScript
Major domains and companies leverage NativeScript to develop high-level applications. However, it all happens due to its native nature. Here are some big brands that use the NativeScript framework.

* Social media apps (WhatsApp, Twitter, Facebook, Qzone)
* Geolocation apps (Banjo, Field trip, Glimpse, Walk for a dog)
* News apps (Reddit, SmartNews, Feedly, Buzzfeed)
* Gaming apps (Real Racing 3, Robot Unicorn Attack 2, Drop7, Crossy road)
* Apps with live feeds (Broadcast me, Livestream, Periscope, Streamnow)
* Video and music streaming apps (Deezer, Apple Music, iHeartRadio)
* Chat apps (Telegram, WhatsApp, Viber, Skype, Snapchat, Messenger)

# README
## Go to Lazhopee-Driver Folder
```
cd Lazhopee-Driver
```
## Create Development env 
```
BACKEND_URL =  http://172.18.42.65:3000 =>  type your ubuntu ip addr and add :3000
USERNAME = mejari => type your default usernme (optional)
PASSWORD = 12345  => type your default password (optional)
```
## Create Production env 
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
 build android  --bundle --env=prod --env.uglify --env.aot --env.snapshot  --release --key-store-path URLShortener.jks  --key-store-password 123456 --key-store-alias URLShortenerApp --key-store-alias-password 123456  --aab --copy-to LazhopeeDriver.aab
```

## Test

####  Integration Tests
```
detox build -c ios|android
detox test -c ios|android
```


# Dependencies
* @nativescript/android: 8.2.2
* @nativescript/types: ~8.2.0
* @nativescript/webpack: ~5.0.6
* typescript: ~4.5.5

# File and Description
 |  File |  Description 
---|  ---| 
[Lazhopee-Driver/app/failed/order/detail-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/order/detail-page.ts) | It will update the status of order and navigate back to failed page
[Lazhopee-Driver/app/failed/order/detail-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/order/detail-page.xml) | It display order detatils 
[Lazhopee-Driver/app/failed/order/detail-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/order/detail-view-model.ts) | It will get and set order detatils
[Lazhopee-Driver/app/failed/order/detail.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/order/detail.css) | Css file for styling order details
[Lazhopee-Driver/app/failed/delivered-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/delivered-page.ts) | It will navigate to failed order details
[Lazhopee-Driver/app/failed/delivered-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/delivered-page.xml)  | It display all failed order 
[Lazhopee-Driver/app/failed/delivered-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/failed/delivered-view-model.ts) | It will get and set failed order
[Lazhopee-Driver/app/home/home-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/home/home-page.ts) | It tabview that will navigate to  shipping page, success page, failed page
[Lazhopee-Driver/app/home/home-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/home/home-page.xml) | It Display tabview that has menu of shipping,succes,failed
[Lazhopee-Driver/app/home/home.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/home/home.css) | Css file for styling home page
[Lazhopee-Driver/app/images](https://github.com/MEJARICLOI/Lazhopee/tree/main/Lazhopee-Driver/app/images) | Storage of all  images
[Lazhopee-Driver/app/login/login-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/login/login-page.ts) | It navigate to home page if user is authorized
[Lazhopee-Driver/app/login/login-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/login/login-page.xml) | It display login form
[Lazhopee-Driver/app/login/login-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/login/login-view-model.ts) | Setting token & product to local storage after user validation 
[Lazhopee-Driver/app/login/login.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/login/login.css) |  Css file for styling login page
[Lazhopee-Driver/app/shipping/order/detail-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/order/detail-page.ts) | It will update the status of order and navigate back to shipping page
[Lazhopee-Driver/app/shipping/order/detail-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/order/detail-page.xml) | It display order details 
[Lazhopee-Driver/app/shipping/order/detail-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/order/detail-view-model.ts) | It will get and set order detatils
[Lazhopee-Driver/app/shipping/order/detail.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/order/detail.css) | Css file for styling order detatils
[Lazhopee-Driver/app/shipping/shipping-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/shipping-page.ts) | It will navigate to shipping order details
[Lazhopee-Driver/app/shipping/shipping-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/shipping-page.xml) | It display all shipping order 
[Lazhopee-Driver/app/shipping/shipping-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/shipping/shipping-view-model.ts) | It will get and set shipping order 
[Lazhopee-Driver/app/success/order/detail-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/order/detail-page.ts) | It will update the status of order and navigate back to success page
[Lazhopee-Driver/app/success/order/detail-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/order/detail-page.xml) | It display order details 
[Lazhopee-Driver/app/success/order/detail-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/order/detail-view-model.ts) | It will get and set order detatils
[Lazhopee-Driver/app/success/order/detail.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/order/detail.css) | Css file for styling order detatils
[Lazhopee-Driver/app/success/delivered-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/delivered-page.ts) | It will navigate to success order details
[Lazhopee-Driver/app/success/delivered-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/delivered-page.xml) | It display all success order
[Lazhopee-Driver/app/success/delivered-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/success/delivered-view-model.ts) | It will get and set success order


[Lazhopee-Driver/app/utils/imageHostCorrector.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Driver/app/utils/imageHostCorrector.ts) | It convert localhost:3000/test.png -> 123.324.231.1/test.png
