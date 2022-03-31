/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { ApplicationSettings, Frame, NavigatedData, Page } from '@nativescript/core'
import { HomeViewModel } from './home-vew-model'
import { StatusViewModel } from '~/order/status-view-model'

let statusViewModel = null
let homeViewModel = null
export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
 homeViewModel = new HomeViewModel
  page.bindingContext = homeViewModel
  await homeViewModel.getProduct()  
<<<<<<< HEAD
  console.log(homeViewModel);
=======
>>>>>>> 93e116a34a9a785a4dc52d166b9a363d78fc5d65
  
  statusViewModel = new StatusViewModel()
}

export  async function refreshList(args) {
  const pullRefresh = args.object;
<<<<<<< HEAD
  console.log( await homeViewModel.refresh());
=======
>>>>>>> 93e116a34a9a785a4dc52d166b9a363d78fc5d65
 await homeViewModel.refresh()
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000);
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

