import { ApplicationSettings, Frame, Http, NavigatedData, Page } from "@nativescript/core"
import { hasKey } from "@nativescript/core/application-settings"
import { CartViewModel } from "./cart-view-model"

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  console.log('cart page');
}
console.log(ApplicationSettings.getString('articles'));

const customerId = ApplicationSettings.getString('customerId')/* .split('"').join('') */
let articles = JSON.parse(ApplicationSettings.getString('articles','[]'))

const cart = JSON.stringify({ 
  customerId,
  articles
})
export function back() {
  Frame.goBack()
}

export async function buy() {
  console.log(cart);
  
  try {
    if (hasKey('articles')) {
        const res = await Http.request({
        url:'http://172.19.168.244:3000/order/',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content:cart
    })
    ApplicationSettings.setString('articles','[]')
    console.log(res.content)
    } else {
      console.log('empty cart');   
    }
    } catch (error) {
      console.log(error);
  }
}