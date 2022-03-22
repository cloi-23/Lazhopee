/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { Frame, NavigatedData, Page } from '@nativescript/core'

import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object

  page.bindingContext = new HomeViewModel()
  // console.log(new HomeViewModel());
  
}

export function show(args){
  // console.log(args.view.bindingContext);
  Frame.topmost().navigate({moduleName:'./order/detail-page',clearHistory:true,context:{
    data:args.view.bindingContext
  }})
}
