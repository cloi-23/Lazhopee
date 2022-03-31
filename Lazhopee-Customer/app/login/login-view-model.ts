import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";

export class LoginViewModel extends Observable{
    private _username:string="user1"
    private _password:string="user1"
    constructor(){
        super();
        this.username;
        this.password;
    }
    get username():string {
        return this._username
    }
    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange("username", value);
        }
    }
    get password():string {
        return this._password
    }
    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange("password", value);
        }
    }
    public async login():Promise<void>{   
        const username =this.username
        const password =this.password
   try {
   const res= await Http.request({
        url:"http://172.20.189.123:3000/customer/login",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    
    ApplicationSettings.setString("customerId",JSON.stringify(res.content.toJSON().id))

    ApplicationSettings.setString("token",JSON.stringify(res.content.toJSON().access_token))
   
    if(res.content.toJSON().status == "ok"){
        
    Frame.topmost().navigate('./home/home-page')
}else{
    Dialogs.alert({
        title:"Lazhopee App",
        message:res.content.toJSON().message,
        cancelable:true,
        okButtonText:"ok"
    })
}
    this.username=""
    this.password=""
   } catch (error) {
       console.log(error);
       
    Dialogs.alert({
        title:"Lazhopee App",
        message:'Wrong Input',
        cancelable:true,
        okButtonText:"ok"
    })
   }
    }
 
 
    
}