import { Observable ,ApplicationSettings, Frame} from '@nativescript/core'
import { Http } from "@nativescript/core";
import { imageHostCorretor } from '~/utils/imageHostCorrector';
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
    private _product:Object=  JSON.parse(ApplicationSettings.getString("productList","[]"))
    private token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))
    constructor(){
      super();
      this.product;
  }

  get  product():Object {
    return this._product
}
set product(value: Object) {
 if (this._product !== value) {
    this._product = value;
    this.notifyPropertyChange("product", value);
    }
}


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
    const productList =  imageHostCorretor(res.content.toJSON())
    ApplicationSettings.setString("productList",JSON.stringify(productList))
    return  productList

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
