import { Observable ,ApplicationSettings} from '@nativescript/core'
import { Http } from "@nativescript/core";

export class CartViewModel extends Observable {
  private _cart:any = JSON.parse(ApplicationSettings.getString('articles','[]'))

  get cart():string{
    if(this._cart.length == 0){
      return `Cart `
    }
    return `Cart (${this._cart.length})`
  }
}

    


  

