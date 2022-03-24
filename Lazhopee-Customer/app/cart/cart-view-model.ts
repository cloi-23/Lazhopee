import { Observable ,ApplicationSettings} from '@nativescript/core'
import { Http } from "@nativescript/core";

export class CartViewModel extends Observable {
  private _cart:any = JSON.parse(ApplicationSettings.getString('articles','[]'))

}

    


  

