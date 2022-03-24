/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { ApplicationSettings, Frame, NavigatedData, Page } from '@nativescript/core'
import { HomeViewModel } from './home-view-model'
import { StatusViewModel } from '~/order/status-view-model'

let statusViewModel = null

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
const homeViewModel =new HomeViewModel()
  page.bindingContext = homeViewModel
  homeViewModel.getProduct()  
  statusViewModel = new StatusViewModel()
}

export async function refreshList(args) {
  const pullRefresh = args.object;
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000)
  ApplicationSettings.remove('articles')
 console.log('refresh');
}

export function clear(){
  ApplicationSettings.clear()
}

export function goToCart() {
  Frame.topmost().navigate('./cart/cart-page')
}

export function goToOrder() {
  Frame.topmost().navigate('./order/status-page')
  statusViewModel.refresh()
}
export function productDetails(args){
Frame.topmost().navigate({moduleName:'./product/detail-page',clearHistory:true,context:{
  data:args.view.bindingContext
}})
}

