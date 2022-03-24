import { ApplicationSettings, Frame, Http, Observable } from "@nativescript/core"

export class HistoryViewModel extends Observable {
  private readonly customerId = JSON.parse(ApplicationSettings.getString('customerId'))
  private readonly _history = JSON.parse(ApplicationSettings.getString('history'))
  async history() {
    try {
        const res = await Http.request({
          url:`http://172.27.103.111:3000/order/customer/${this.customerId}`,
          method: 'GET'
        })
        const deliveredOrder = res.content.toJSON().filter(x => { 
          if(x.status == 'Success' || x.status == 'Failed'){  
          return x
        } else {
          return false
        }
         })
          const productList = deliveredOrder.map(y => { 
            const imageHost = y.image.split('').slice(7,16).join('')
            if(imageHost == 'localhost'){
                const imgLocation = y.image.split('').slice(16).join('')
                const image = `http://172.27.103.111${imgLocation}`;
            return {
              productId: y.productId,
              sellingPrice: y.sellingPrice,
              quantity: y.quantity,
              name: y.name,
              image: image,
              status: y.status
              }
            }
           })
           
          ApplicationSettings.setString('history', JSON.stringify(productList))
    } catch (error) {
      console.log(error);   
    }
  }
  async refresh(){
    await this.history()
    // ApplicationSettings.setString("status",JSON.stringify(productList))
    Frame.topmost().navigate('./history/history-page')
    }
}