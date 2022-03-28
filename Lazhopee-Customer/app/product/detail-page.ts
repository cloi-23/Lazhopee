import { Frame, NavigatedData, Page,getViewById } from '@nativescript/core'
import { DetailViewModel } from './detail-view-model';
let description = null
let descLayout = null
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
    page.bindingContext=new DetailViewModel(page.navigationContext.data)
    description =getViewById(page, "description");
    descLayout = getViewById(page, "descLayout");
}

export function back(){
  Frame.topmost().navigate("./home/home-page")
}

export function goToCart() {
  Frame.topmost().navigate('./cart/cart-page')
}

export function show (args){

  const toggle = description.textWrap = !description.textWrap
  descLayout.height=toggle ? '30%' : '5%'

  

 
 

}