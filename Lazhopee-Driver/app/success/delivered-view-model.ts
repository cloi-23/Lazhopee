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
  private token = JSON.parse(ApplicationSettings.getString("token","[]"))
  private deliverList:any=JSON.parse(ApplicationSettings.getString("deliverDetails","[]"))
  private _driveName: string = JSON.parse(ApplicationSettings.getString('name'))

  async getDeliverDetails(){
    try {
     let deliverList =  this._deliverList
     const deliveries = []
     for (const deliver of deliverList) {
       const orderId = deliver.orderId
       const orderRes= await Http.request({
        url:`${process.env.BACKEND_URL}/order/details/${orderId.split('"').join('')}`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : `Bearer ${this.token}`    
      },
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
      if(x.order.status =='Success' ){
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
       url:`${process.env.BACKEND_URL}/delivery/driver/${driverId.split('"').join('')}`,
       method:'GET',
       headers:{
         'Content-Type':'application/json',
         'Authorization' : `Bearer ${this.token}`    
     },
   })
   ApplicationSettings.setString("deliverList",JSON.stringify(res.content))
    await this.getDeliverDetails()
    Frame.topmost().navigate('./success/delivered-page')
    return "Delivered reload"
  }
  get driverName():string{
    return this._driveName
  }

}
