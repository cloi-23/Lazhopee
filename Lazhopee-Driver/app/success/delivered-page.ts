/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { Frame, NavigatedData, Page } from '@nativescript/core'

import { DeliveredViewModel } from './delivered-view-model'

let deliveredViewModel = null
export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object

  page.bindingContext = new DeliveredViewModel()
  deliveredViewModel = new DeliveredViewModel()
  await deliveredViewModel.getDeliverDetails()
  
}
export  async function refreshList(args) {
  const pullRefresh = args.object;
  console.log( await deliveredViewModel.refresh());
 await deliveredViewModel.refresh()
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000);
}
export function show(args){
  Frame.topmost().navigate({moduleName:'./success/order/detail-page',context:{
    data:args.view.bindingContext
  }})
}
