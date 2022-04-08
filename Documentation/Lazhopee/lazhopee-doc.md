# Lazhopee Documentation
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


# Dependencies
* @nativescript/android: 8.2.2
* @nativescript/types: ~8.2.0
* @nativescript/webpack: ~5.0.6
* typescript: ~4.5.5

# File and Description
 |  File |  Description 
---|  ---| 
[Lazhopee-Customer\app\register\emailValidator.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/register/emailValidator.ts) | Validate the input email
[Lazhopee-Customer\app\register\register-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/register/register-page.ts) |  Validate user input and send confirmation to email
[Lazhopee-Customer\app\register\register-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/register/register-page.xml) | Display form for user input 
[Lazhopee-Customer\app\login\login-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/login/login-view-model.ts) | Setting token & product to local storage after user validation 
[Lazhopee-Customer\app\login\login-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/login/login-page.ts) | Navigate to register page 
[Lazhopee-Customer\app\login\login-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/login/login-page.xml) | Display login or Label to navigate to register page
[Lazhopee-Customer\app\home\home-vew-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/home/home-vew-model.ts) | Get product to local storage & send to xml
[Lazhopee-Customer\app\home\home-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/home/home-page.ts) | Navigate to order, to cart & to product details
[Lazhopee-Customer\app\home\home-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/home/home-page.xml) | It Shows all the product
[Lazhopee-Customer\app\order\status-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/order/status-view-model.ts) | Get order to local storage & send to xml
[Lazhopee-Customer\app\order\status-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/order/status-page.ts) | Navigate to history
[Lazhopee-Customer\app\order\status-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/order/status-page.xml) | It show each order with status
[Lazhopee-Customer\app\product\detail-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/product/detail-view-model.ts) | After viewing it can buy and add to cart 
[Lazhopee-Customer\app\product\detail-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/product/detail-page.ts) | set text product description
[Lazhopee-Customer\app\product\detail-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/product/detail-page.xml) | It show image and details of product
[Lazhopee-Customer\app\cart\cart-view-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/cart/cart-view-model.ts) | Getting the data in cart and send to xml
[Lazhopee-Customer\app\cart\cart-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/cart/cart-page.ts) | It clear items to cart
[Lazhopee-Customer\app\cart\cart-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/cart/cart-page.xml) | It shows item to cart
[Lazhopee-Customer\app\history\history-page.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/history/history-page.ts) | It trigger the request data function when navigate 
[Lazhopee-Customer\app\history\history-vew-model.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/history/history-vew-model.ts) | Getting the history data of Customer order and send to xml
[Lazhopee-Customer\app\history\history-page.xml](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/history/history-page.xml) | It shows order history of the client
[Lazhopee-Customer\app\images](https://github.com/MEJARICLOI/Lazhopee/tree/main/Lazhopee-Customer/app/images) | store all  images
[Lazhopee-Customer\app\utils\imageHostCorrector.ts](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/utils/imageHostCorrector.ts) | It convert localhost:3000/test.png -> 123.324.231.1/test.png
[Lazhopee-Customer\app\login\login.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/login/login.css) | Css file for styling login page
[Lazhopee-Customer\app\home\home-page.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/home/home-page.css) | Css file for styling home page
[Lazhopee-Customer\app\product\detail.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/product/detail.css) | Css file for styling product detail page
[Lazhopee-Customer\app\cart\cart-page.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/cart/cart-page.css) | Css file for styling cart page
[Lazhopee-Customer\app\history\history-page.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/history/history-page.css) | Css file for styling history page
[Lazhopee-Customer\app\order\status-page.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/order/status-page.css) | Css file for styling order status page
[Lazhopee-Customer\app\app.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/app.css) | Css file for styling app page
[Lazhopee-Customer\app\register\register.css](https://github.com/MEJARICLOI/Lazhopee/blob/main/Lazhopee-Customer/app/register/register.css) | Css file for styling register page
