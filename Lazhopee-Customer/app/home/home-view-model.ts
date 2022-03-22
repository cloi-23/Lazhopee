import { Observable ,ApplicationSettings} from '@nativescript/core'
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
     async getProduct():Promise<Object>{
      
     try {
      const res= await Http.request({
        url:"http://172.19.168.244:3000/product",
        method:'GET',
    })
   const productList =  res.content.toJSON().map(prod =>{

      const imageHost =  prod.image.split('').slice(7,16).join('')
      if(imageHost == 'localhost'){
        const imgLocation=prod.image.split('').slice(16).join('')
        const image = `http://172.19.168.244${imgLocation}`;
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
    

    // add(longUrl,shortUrl):void{
    //   this.product.push({longUrl,shortUrl})
    //   ApplicationSettings.setString("urlCollection",JSON.stringify(this.urlCollection))
    
    // }
  
}
