import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";

export class LoginViewModel extends Observable{
    private _username:string="bucky"
    private _password:string="123"
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
        //adb reverse tcp:5000 tcp:5000
        console.log("login");
        
        const username =this.username
        const password =this.password
   try {
   const res= await Http.request({
        url:"http://172.22.91.133:3000/customer/login",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    console.log("From login:",res.content);
    ApplicationSettings.setString("userdata",JSON.stringify(res.content))
    console.log(res.statusCode );
    
    if(res.content.toJSON().status == "ok"){

    Frame.topmost().navigate({moduleName:'./home/home-page',clearHistory:true,context:{
        data:res.content.toJSON()
    }})
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
   }
    }
 
 
    
}