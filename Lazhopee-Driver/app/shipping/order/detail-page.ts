import { ApplicationSettings, EventData, Frame, Http, ListPicker, NavigatedData, Page} from '@nativescript/core'
import { ShippingViewModel } from '../shipping-view-model';
import { DetailViewModel } from './detail-view-model';

let detailview = null
let status = null
let currentStat = null
let updateStatus =null
let shippingViewModel = null
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
    page.bindingContext=new DetailViewModel(page.navigationContext.data)
     detailview = new DetailViewModel(page.navigationContext.data)
    currentStat = page.getViewById('currentStat')
    updateStatus = page.getViewById('updateStatus')
    shippingViewModel = new ShippingViewModel
}
export function back(){
  Frame.goBack()
}

export function onListPickerLoaded(args) {
  const listPickerComponent = args.object
  listPickerComponent.on('selectedIndexChange', (data: EventData) => {
    const picker = data.object as ListPicker
    status=detailview.status[picker.selectedIndex]
 
  })
}
export async function save(){

const token = JSON.parse(ApplicationSettings.getString('token'))
if(status!=null){
 try {
  const res= await Http.request({
    url:`${process.env.BACKEND_URL}/order/${detailview.orderId.split('"').join('')}`,
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`    
  },
    content: JSON.stringify({
      status: status,
    }),

})
currentStat.visibility="visible"
updateStatus.visibility="collapsed"
await shippingViewModel.refresh()
Frame.topmost().navigate('./shipping/shipping-page')
const result = res.content.toJSON();
console.log(`Http POST Result: ${result}`)

 } catch (error) {
  console.log(`Http POST Result: ${error}`)
 }

}
}

export function update(){
  currentStat.visibility="collapsed"
  updateStatus.visibility="visible"
}