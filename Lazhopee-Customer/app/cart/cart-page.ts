import { ApplicationSettings, Frame, Http, NavigatedData, Page } from "@nativescript/core"
import { hasKey } from "@nativescript/core/application-settings"
import { CartViewModel } from "./cart-view-model"

export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new CartViewModel()

}

export function back() {
  Frame.topmost().navigate('./home/home-page')
}
export function clear() {
  ApplicationSettings.remove('articles')
  Frame.topmost().navigate('./cart/cart-page')
}

const customerId = JSON.parse(ApplicationSettings.getString('customerId'))

 export async function refreshList(args) {
  const pullRefresh = args.object;
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000)
 
}

function list () {
  const articles = JSON.parse(ApplicationSettings.getString('articles','[]'))
  let newArticles = []
  for(let x of articles){
    const data = {
      productId: x.productId,
      sellingPrice: x.sellingPrice,
      quantity: x.quantity
    }
    newArticles.push(data)
  }  
  
  return newArticles
}
const token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))
export async function buy() {
  let articles = list()
  
  try {
    if (hasKey('articles')) {
        const res = await Http.request({
          url:'http://172.20.188.182:3000/order/',
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`    
        },
        content:JSON.stringify({ customerId,articles })
    })
    console.log('Successfully Purchase!')
    ApplicationSettings.remove('articles')
    Frame.topmost().navigate('./home/home-page')
    } else {
      console.log('empty cart');   
    }
    } catch (error) {
      console.log(error);
  }
 
}