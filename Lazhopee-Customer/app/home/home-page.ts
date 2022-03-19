/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { ApplicationSettings, Frame, NavigatedData, Page } from '@nativescript/core'


import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
const homeViewModel =new HomeViewModel()
  page.bindingContext = homeViewModel
  homeViewModel.getProduct()

  console.log(homeViewModel);
  
}
export function clear(){
  ApplicationSettings.clear()
}

export function productDetails(args){
//   console.log(args.view.bindingContext);
// console.log("details",);
Frame.topmost().navigate({moduleName:'./product/detail-page',clearHistory:true,context:{
  data:args.view.bindingContext
}})

}

