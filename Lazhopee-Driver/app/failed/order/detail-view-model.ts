import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";
interface OrderDetails{
    _id: string,
    driverId:string,
    orderId:string,
    order:{
        _id:string,
        date:string,
        name:string,
        address:string,
        contact:string,
        status:string,
        articles:[
            {
                productId:string,
                sellingPrice:any,
                quantity:any,
                name:string,
                image:string

            }
        ]

    }


}
export class DetailViewModel extends Observable{
    private _orderId:string
    private _image:string
    private _driverId:string
    private _articles:any
    private _total:any
    private _name:string
    private _contact:string
    private _address:string
    private _status:string
    public datas:OrderDetails

    constructor(data:OrderDetails){
        super();
        ApplicationSettings.setString("status",JSON.stringify(data.order.status)) 
        this._orderId = data.orderId
         this.datas = data
         this._image = data.order.articles[0].image
         this._articles = data.order.articles
         this._total = []
         this._name = data.order.name
         this._address = data.order.address
         this._contact=data.order.contact
         this._status = JSON.parse(ApplicationSettings.getString("status"))
         
     
    }
    get orderId():string {
     
        
        return this._orderId
    }
    get image():string {
        const imageHost =   this._image.split('').slice(7,16).join('')
        if(imageHost == 'localhost'){
            const imgLocation=this._image.split('').slice(16).join('')
            const image = `${process.env.BACKEND_URL}${imgLocation}`;
        return image
    }
    return this._image  
    }
    get articles():string {
     const articles = this._articles.map(prod =>{
         const quantity = prod.quantity
         const price = prod.sellingPrice
         this._total.push(quantity * price)
    
        return {
            productId: prod.productId,
            sellingPrice:prod.sellingPrice,
            quantity:prod.quantity,
            name:prod.name,
            image:prod.image,
            total:quantity * price
        }
  
   
     })
        return articles   
    }
    get totalAmount():Number{
        const totalAmount = this._total.reduce((x,y)=>x+y)
        return totalAmount
    }
    get status():Array<string>{
        return ["Success",'Failed']
    }
    get name():string{
        return this._name
    }
    get address():string{
        return this._address
    }
    get contact():string{
        return this._contact
    }
    get currentStatus(){
        return this._status
    }
 
 
    
}