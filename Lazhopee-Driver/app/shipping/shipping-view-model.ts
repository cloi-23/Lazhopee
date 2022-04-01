import { Observable ,ApplicationSettings, Http, Frame} from '@nativescript/core'
interface ShippingList{
  _id: string,
driverId: string,
orderId:string,
driverName: string,
order:Array<object>
}

export class ShippingViewModel extends Observable {

  private _shippingList = JSON.parse(ApplicationSettings.getString("shippingList","[]"))
  private shippingList:any=JSON.parse(ApplicationSettings.getString("shippingDetails","[]"))

  async getShippingDetails(){
    try {
     let shippingList =  this._shippingList
     const shippingOrder = []
     for (const shipping of shippingList) {
       const orderId = shipping.orderId
       const orderRes= await Http.request({
        url:`http://172.24.211.16:3000/order/details/${orderId.split('"').join('')}`,
        method:'GET',
    })
    const order = orderRes.content.toJSON()
       const data = {
         _id: shipping._id,
         driverId: shipping.driverId,
         orderId: shipping.orderId,
         order:order
       }
       shippingOrder.push(data)    
     }
const filteredOrderByShipping = shippingOrder.filter(x=>{
  if(x.order.status =='Shipping'){
    return x
  }
  return false
})
     ApplicationSettings.setString("shippingDetails",JSON.stringify(filteredOrderByShipping))
    } catch (error) {
      console.log(error);
      
    }
  }
  async refresh(){
 
    const driverId= ApplicationSettings.getString('driverId')
   const res= await Http.request({
       url:`http://172.24.211.16:3000/delivery/driver/${driverId.split('"').join('')}`,
       method:'GET',
   })
   ApplicationSettings.setString("shippingList",JSON.stringify(res.content))
    await this.getShippingDetails()
    Frame.topmost().navigate('./shipping/shipping-page')
   
    
    return "Shipping reload"
  }

}
