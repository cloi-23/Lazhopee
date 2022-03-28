import { ApplicationSettings, EventData, Frame, Http, ListPicker, NavigatedData, Page} from '@nativescript/core'
import { HomeViewModel } from '~/home/home-view-model';
import { DetailViewModel } from './detail-view-model';

let detailview = null
let status = null
let currentStat = null
let updateStatus =null
let homeViewModel = null
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
    page.bindingContext=new DetailViewModel(page.navigationContext.data)
     detailview = new DetailViewModel(page.navigationContext.data)
     console.log(page.navigationContext.data);
    currentStat = page.getViewById('currentStat')
    updateStatus = page.getViewById('updateStatus')
    homeViewModel = new HomeViewModel
     

}
export function back(){
  Frame.topmost().navigate('./home/home-page')
}

export function onListPickerLoaded(args) {
  const listPickerComponent = args.object
  listPickerComponent.on('selectedIndexChange', (data: EventData) => {
    const picker = data.object as ListPicker
    status=detailview.status[picker.selectedIndex]
 
  })
}
export async function save(){


if(status!=null){
 try {
  const res= await Http.request({
    url:`http://172.23.209.112:3000/order/${detailview.orderId.split('"').join('')}`,
    method:'PATCH',
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({
      status: status,
    }),

})
currentStat.visibility="visible"
updateStatus.visibility="collapsed"
await homeViewModel.refresh()
Frame.topmost().navigate('home/home-page')
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