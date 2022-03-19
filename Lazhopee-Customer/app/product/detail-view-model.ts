import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";
interface Data{

        name:string,
        description:string,
        image:string,
        sellingPrice:number,
        _id:string
 
}
export class DetailViewModel extends Observable{
    private _name:string
    private _image:string
    private _description:string
    private _price:number
constructor(data:Data){
    super()
    this._name=data.name
    this._image=data.image
    this._description=data.description
    this._price=data.sellingPrice
}
 get name():string{
    return this._name
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

}