import { ApplicationSettings, EventData, Frame, Http, ListPicker, NavigatedData, Page} from '@nativescript/core'
import { DetailViewModel } from './detail-view-model';

let detailview = null
let status = null
let currentStat = null
let updateStatus =null
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
    page.bindingContext=new DetailViewModel(page.navigationContext.data)
     detailview = new DetailViewModel(page.navigationContext.data)
     console.log(page.navigationContext.data);
    currentStat = page.getViewById('currentStat')
    updateStatus = page.getViewById('updateStatus')
     

}
export function back(){
  Frame.topmost().navigate('./home/home-page')
}

export function onListPickerLoaded(args) {
  const listPickerComponent = args.object
  listPickerComponent.on('selectedIndexChange', (data: EventData) => {
    const picker = data.object as ListPicker
    status=detailview.status[picker.selectedIndex]
    // console.log(`index: ${picker.selectedIndex}; item" ${detailview.status[picker.selectedIndex]}`)
  })
}
export async function save(){
  ApplicationSettings.remove('status')
  ApplicationSettings.getString('status',status)

if(status!=null){
 
 try {
  const res= await Http.request({
    url:`http://172.23.131.123:3000/order/${detailview.orderId.split('"').join('')}`,
    method:'PATCH',
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({
      status: status,
    }),

})
currentStat.visibility="visible"
updateStatus.visibility="collapsed"
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