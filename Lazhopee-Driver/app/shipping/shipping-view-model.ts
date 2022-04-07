import { Observable ,ApplicationSettings, Http, Frame} from '@nativescript/core'
import { JwtTokenGuard } from '~/utils/JwtTokenGuard'
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
  private token: string = JSON.parse(ApplicationSettings.getString('token'))
  private _driveName: string = JSON.parse(ApplicationSettings.getString('name'))
  async getShippingDetails(){
    try {
     let shippingList =  this._shippingList
     const shippingOrder = []
     for (const shipping of shippingList) {
       const orderId = shipping.orderId
       const jwtTokenGuard=new JwtTokenGuard()
       const orderRes=  await Http.request({
        url:`${process.env.BACKEND_URL}/order/details/${orderId.split('"').join('')}`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : `Bearer ${this.token}`    
        }
      })
      // await jwtTokenGuard.get(`${process.env.BACKEND_URL}/order/details/${orderId.split('"').join('')}`)
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
    const jwtTokenGuard=new JwtTokenGuard()
     const res=  await Http.request({
      url:`${process.env.BACKEND_URL}/delivery/driver/${driverId.split('"').join('')}`,
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization' : `Bearer ${this.token}`    
      }
    })
     //await jwtTokenGuard.get(`${process.env.BACKEND_URL}/delivery/driver/${driverId.split('"').join('')}`)
     ApplicationSettings.setString("shippingList",JSON.stringify(res.content))
    await this.getShippingDetails()
    Frame.topmost().navigate('./shipping/shipping-page')
   console.log(res.content);
   
    
    return "Shipping reload"
  }

  get driverName():string{
    return this._driveName
  }
}
