import { Observable,Dialogs,Frame,Page ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";
interface Data{
    name:string,
    description:string,
    image:string,
    sellingPrice:number,
    _id:string
}


export class DetailViewModel extends Observable{
    private _quantity: number = 1
    private _price:number 
    private _totalPrice: number 
    private _name:string
    private _image:string
    private _description:string
    private _products:object
    private _articles:any
    private _cart: object
    private customerId = ApplicationSettings.getString('customerId').split('"').join('')
    private token:String=  JSON.parse(ApplicationSettings.getString("token","[]"))
    private _page:Page
    private _id:string
constructor(data:Data){
    super()
    this._id=data._id
    this._name=data.name
    this._image=data.image
    this._description=data.description
    this._price=data.sellingPrice
    this._products = data
    this._articles = JSON.parse(ApplicationSettings.getString('articles','[]'))
    this._cart = { customerId: this.customerId, articles: this._articles }
}

 get name():string{        
    return this._name
}

get quantity():number {
  return this._quantity
}
set quantity(value: number) {
  if (this._quantity !== value) {
      this._quantity = value;
      this.notifyPropertyChange("quantity", value);
  }
}

get totalPrice():number {
  return this._quantity * this._price  
}
set totalPrice(value: number) {
  if (this._totalPrice !== value) {
      this._totalPrice = value;
      this.notifyPropertyChange("totalPrice", value);
  }
}

get image():string{  
    return this._image
}
get description():string{
    return this._description
}
get price():number{
    return this._price
}  
  
  addToCart() { 
    let articles = this._articles
      const found = articles.some(x => x.productId === this._id);
      if(!found) { 
        articles.push({
          productId:  this._id,
          sellingPrice: this._price,
          quantity: this.quantity,
          name: this._name,
          image: this._image })
      } else { 
        let product = articles.filter(x => x.productId == this._id)    
        product[0].quantity+=this._quantity
      }
    ApplicationSettings.setString('articles',JSON.stringify(articles))
    Frame.topmost().navigate('./home/home-page')
  }

backButton() {
  Frame.goBack()
}
async buy() {
  try {
        const res = await Http.request({
        url:'http://172.20.188.182:3000/order/',
        method: 'POST',
        headers: { "Content-Type": "application/json",
        'Authorization' : `Bearer ${this.token}` },
        content: JSON.stringify({
          customerId: this.customerId,
          articles:[{
            productId:  this._id,
            sellingPrice: this._price,
            quantity: this.quantity }]
        })
    })
      console.log('Successfully Purchase!')
      this.backButton()
    } catch (error) {
      console.log(error);
  }
}
add() {
    this.quantity++
  }
less() {
  if( this._quantity !== 1 ) this.quantity--
   
  }

  get cart():string{
    const count =JSON.parse(ApplicationSettings.getString('articles','[]'))
    if(count.length == 0){
      return 'Cart'
    }
    return `Cart (${count.length})`
  }


}