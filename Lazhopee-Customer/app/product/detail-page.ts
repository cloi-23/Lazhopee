import { Frame, NavigatedData, Page,getViewById } from '@nativescript/core'
import { DetailViewModel } from './detail-view-model';
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
console.log(page.navigationContext.data);

     page.bindingContext=new DetailViewModel(page.navigationContext.data)
 

  
}

export function back(){
  Frame.topmost().navigate("./home/home-page")
}

export function show (args){
  const page = <Page>args.object
  const description =getViewById(page, "description");
description.textWrap = !description.textWrap
 

}