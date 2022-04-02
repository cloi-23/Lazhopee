import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";

export class LoginViewModel extends Observable{
    private _errMsg:string = ''
    private _username:string="user0"
    private _password:string="user0"
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

    get errMsg():string {
        return this._errMsg
    }

    set errMsg(value: string) {
    if (this._errMsg !== value) {
        this._errMsg = value;
        this.notifyPropertyChange("errMsg", value);
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
        url:"http://172.20.188.182:3000/customer/login",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    console.log(res.content.toJSON().message);
    this.errMsg = res.content.toJSON().message
    
    if(res.content.toJSON().status == "ok") {
     ApplicationSettings.setString("customerId",JSON.stringify(res.content.toJSON().id))
     ApplicationSettings.setString("token",JSON.stringify(res.content.toJSON().access_token))        
     Frame.topmost().navigate('./home/home-page')
     this.username=""
     this.password=""

    } else {
    Dialogs.alert({
    title:"Lazhopee App",
    message:'Invalid User',
    cancelable:true,
    okButtonText:"ok"
    })
    }

   } catch (error) {
    console.log(error);
   }
 }   
}