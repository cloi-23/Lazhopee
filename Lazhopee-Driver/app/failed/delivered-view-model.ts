import { Observable ,ApplicationSettings, Http, Frame} from '@nativescript/core'
interface DeliverList{
  _id: string,
driverId: string,
orderId:string,
driverName: string,
order:Array<object>
}

export class DeliveredViewModel extends Observable {

  private _deliverList = JSON.parse(ApplicationSettings.getString("deliverList","[]"))
  private deliverList:any=JSON.parse(ApplicationSettings.getString("deliverDetails","[]"))

  async getDeliverDetails(){
    try {
     let deliverList =  this._deliverList
     const deliveries = []
     for (const deliver of deliverList) {
       const orderId = deliver.orderId
       const orderRes= await Http.request({
        url:`http://172.24.211.16:3000/order/details/${orderId.split('"').join('')}`,
        method:'GET',
    })
    const order = orderRes.content.toJSON()
       const data = {
         _id: deliver._id,
         driverId: deliver.driverId,
         orderId: deliver.orderId,
         order
       }
       deliveries.push(data)    
     }
     const filteredOrderByDelivered = deliveries.filter(x=>{
      if(x.order.status =='Failed'){
        return x
      }
      return false
    })
  
     ApplicationSettings.setString("deliverDetails",JSON.stringify(filteredOrderByDelivered))
  
    } catch (error) {
      
    }
  }

  async refresh(){
 
    const driverId= ApplicationSettings.getString('driverId')
   const res= await Http.request({
       url:`http://172.24.211.16:3000/delivery/driver/${driverId.split('"').join('')}`,
       method:'GET',
   })
   ApplicationSettings.setString("deliverList",JSON.stringify(res.content))
    await this.getDeliverDetails()
    Frame.topmost().navigate('./failed/delivered-page')
    return "Delivered reload"
  }

}
