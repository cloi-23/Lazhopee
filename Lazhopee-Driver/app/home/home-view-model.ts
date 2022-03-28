import { Observable ,ApplicationSettings, Http, Frame} from '@nativescript/core'
interface DeliverList{
  _id: string,
driverId: string,
orderId:string,
driverName: string,
order:Array<object>
}

export class HomeViewModel extends Observable {

  private _deliverList = JSON.parse(ApplicationSettings.getString("deliverList","[]"))
  private deliverList:any=JSON.parse(ApplicationSettings.getString("deliverDetails","[]"))

  async getDeliverDetails(){
    try {
     let deliverList =  this._deliverList
     const deliveries = []
     for (const deliver of deliverList) {
       const orderId = deliver.orderId
      
       
       const orderRes= await Http.request({
        url:`http://172.23.209.112:3000/order/details/${orderId.split('"').join('')}`,
        method:'GET',
    })
    const order = orderRes.content
       const data = {
         _id: deliver._id,
         driverId: deliver.driverId,
         orderId: deliver.orderId,
         order
       }
       
       deliveries.push(data)    
      
     }
   

     ApplicationSettings.setString("deliverDetails",JSON.stringify(deliveries))
    
  
    } catch (error) {
      
    }
  }

  async refresh(){
 
    const driverId= ApplicationSettings.getString('driverId')
   const res= await Http.request({
       url:`http://172.23.209.112:3000/delivery/driver/${driverId.split('"').join('')}`,
       method:'GET',
   })
   ApplicationSettings.setString("deliverList",JSON.stringify(res.content))
    this.getDeliverDetails()
    Frame.topmost().navigate('./home/home-page')
    return "reload"
  }

}
