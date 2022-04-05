import { ApplicationSettings, Frame, Http, Observable } from "@nativescript/core"

export class StatusViewModel extends Observable {
  private readonly customerId = JSON.parse(ApplicationSettings.getString('customerId'))
  private readonly _status = JSON.parse(ApplicationSettings.getString('status','[]'))
  private token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))

  async status() {
    try {
        const res = await Http.request({
          url:`${process.env.BACKEND_URL}/order/customer/${this.customerId}`,
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${this.token}`    
        },
        })
          const deliveredOrder = res.content.toJSON().filter(x => { 
            if(x.status == 'Shipping' || x.status == 'Pending'){  
            return x
          } else {
            return false
          }
           })
           const productList = deliveredOrder.map(y => {
            const imageHost = y.image.split('').slice(7,16).join('')
            if(imageHost == 'localhost') {
                const imgLocation = y.image.split('').slice(16).join('')
                const image = `${process.env.BACKEND_URL}${imgLocation}`;       
               const data = {
                  productId: y.productId,
                  sellingPrice: y.sellingPrice,
                  quantity: y.quantity,
                  name: y.name,
                  image,
                  status: y.status
                  }   
               return data                       
            }
          })
          
          ApplicationSettings.setString('status', JSON.stringify(productList))
          
    } catch (error) {
      console.log(error);   
    }
  }
  async refresh(){
  await this.status()
  Frame.topmost().navigate('./order/status-page')
  return "reload"
  }
}