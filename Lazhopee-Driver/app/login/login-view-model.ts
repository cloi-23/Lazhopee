import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";

export class LoginViewModel extends Observable{
    private _username:string="6387043"
    private _password:string="lazhopee-driver"
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
        url:"http://172.24.211.16:3000/driver/login",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    console.log("From login:",res.content);
    ApplicationSettings.setString("driverId",JSON.stringify(res.content.toJSON().id))
     const driverId= ApplicationSettings.getString('driverId')
    const resDelivery= await Http.request({
        url:`http://172.24.211.16:3000/delivery/driver/${driverId.split('"').join('')}`,
        method:'GET',
    })
    

    ApplicationSettings.setString("deliverList",JSON.stringify(resDelivery.content))
    ApplicationSettings.setString("shippingList",JSON.stringify(resDelivery.content))
    if(res.content.toJSON().status == "ok" || 200){

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
   }
    }
 
 
    
}