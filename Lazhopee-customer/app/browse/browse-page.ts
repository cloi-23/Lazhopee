import { Frame, Http } from '@nativescript/core'
import { ApplicationSettings, NavigatedData, Page } from '@nativescript/core'

let quantity = null
export function myPageWasLoaded(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = { products: cart }
  quantity = page.getViewById('quantity')
}
const id = JSON.parse(ApplicationSettings.getString('user')) 
console.log('id',id);

let cart: object[] = JSON.parse(ApplicationSettings.getString('cart','[]'))
export function addToCart() {
  cart.push({
    articles:{ productId: products[0]['_id'],
      price: products[0].sellingPrice,
      quantity: quantity.text }
  })
// let articles = Object.assign(cart[0].)  
// ApplicationSettings.setString('cart', JSON.stringify(cart))
// console.log(cart);
}
export function backButton() {
  Frame.goBack()
}

export async function buy () {
  try {
    const res = await Http.request({
      url:'http://172.25.144.219:3000/order/',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      // content: JSON.stringify(cart)
      content: JSON.stringify({
        customerId:id,
        articles:[{ productId: products[0]['_id'],
          sellingPrice: products[0].sellingPrice,
          quantity: quantity.text }]
      })
  })
  console.log(res.content);

  } catch (error) {
    console.log(error);
  }
}

let products = null
function getProducts () {
  Http.getJSON('http://172.25.144.219:3000/product/').then(
  (result: any) => {
    console.log(result); 
    return products = result
    },
    e => {
  })
}
getProducts()