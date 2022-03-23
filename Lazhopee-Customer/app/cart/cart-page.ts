import { ApplicationSettings, Frame, Http, NavigatedData, Page } from "@nativescript/core"
import { hasKey } from "@nativescript/core/application-settings"
import { CartViewModel } from "./cart-view-model"

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
}

export function back() {
  Frame.goBack()
}

const customerId = JSON.parse(ApplicationSettings.getString('customerId'))
async function orderList() {
  try {
    const res = await Http.request({
      url:`http://172.22.18.26:3000/order/customer/${customerId}`,
      method: 'GET'
    })
    console.log(res.content);
  } catch (error) {
    console.log(error);   
  }
  console.log('dawdwawa');
}
orderList()

 export async function refreshList(args) {
  const pullRefresh = args.object;
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000)
  ApplicationSettings.remove('articles')
  orderList()
  console.log('refresh');
}

function list () {
  const articles = JSON.parse(ApplicationSettings.getString('articles','[]'))
  return articles
}
export async function buy() {
  let articles = list()
  
  try {
    if (hasKey('articles')) {
        const res = await Http.request({
        url:'http://172.22.18.26:3000/order/',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content:JSON.stringify({ customerId,articles })
    })
    console.log('Successfully Purchase!')
    ApplicationSettings.remove('articles')
    } else {
      console.log('empty cart');   
    }
    } catch (error) {
      console.log(error);
  }
 
}