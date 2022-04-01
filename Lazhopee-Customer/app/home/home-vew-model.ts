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
        url:"http://172.20.188.182:3000/product",
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : `Bearer ${this.token}`    
      },
    })
   const productList =  res.content.toJSON().map(prod =>{

      const imageHost =  prod.image.split('').slice(7,16).join('')
      if(imageHost == 'localhost'){
        const imgLocation=prod.image.split('').slice(16).join('')
        const image = `http://172.20.188.182${imgLocation}`;
        return{
          ...prod,
          image
        } 
      }
      return prod
    })

    ApplicationSettings.setString("productList",JSON.stringify(productList))
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
