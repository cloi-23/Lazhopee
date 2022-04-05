import { Observable ,ApplicationSettings, Frame} from '@nativescript/core'
import { Http } from "@nativescript/core";
interface ProductDetails    {
  _id: string,
  sellingPrice: number,
  image: string,
  storeId: string,
  name: string,
  store: string,
  category: string
}
export class HomeViewModel extends Observable {
    private product:Object=  JSON.parse(ApplicationSettings.getString("productList","[]"))
    private token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))
    
     async getProduct():Promise<Object>{ 

     try {
      const res= await Http.request({
        url:`${process.env.BACKEND_URL}/product`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : `Bearer ${this.token}`    
      },
    })
    console.log(res.content);
    

    ApplicationSettings.setString("productList",JSON.stringify(res.content))
    return  res.content

     } catch (error) {
       console.log(error);
       
     }
    }
   async  refresh(){

await this.getProduct()
Frame.topmost().navigate('./home/home-page')
return "reload"
    }
    get cart():string{
      const count =JSON.parse(ApplicationSettings.getString('articles','[]'))
      if(count.length == 0){
        return 'Cart'
      }
      return `Cart (${count.length})`
    }
}
