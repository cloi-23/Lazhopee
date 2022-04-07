import { ApplicationSettings, Frame, Http, Observable } from "@nativescript/core"
import { imageHostCorretor } from "~/utils/imageHostCorrector"

export class HistoryViewModel extends Observable {
  private readonly customerId = JSON.parse(ApplicationSettings.getString('customerId'))
  private readonly _history = JSON.parse(ApplicationSettings.getString('history','[]'))
  private token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))

  async history() {
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
          if(x.status == 'Success' || x.status == 'Failed'){  
          return x
        } else {
          return false
        }
         })
          const productList = imageHostCorretor(deliveredOrder)
          ApplicationSettings.setString('history', JSON.stringify(productList))
    } catch (error) {
      console.log(error);   
    }
  }
  async refresh(){
    await this.history()
    Frame.topmost().navigate('./history/history-page')
    return "reload"
    }
}