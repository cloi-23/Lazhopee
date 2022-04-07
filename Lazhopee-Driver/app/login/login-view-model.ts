import { Observable,Dialogs,Frame ,ApplicationSettings} from "@nativescript/core";
import { Http } from "@nativescript/core";
import { JwtTokenGuard } from "~/utils/JwtTokenGuard";

export class LoginViewModel extends Observable{
    private _username:string=process.env.USERNAME
    private _password:string=process.env.PASSWORD
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
        console.log("login",process.env.BACKEND_URL);
        
        const username =this.username
        const password =this.password
   try {
   const res= await Http.request({
        url:`${process.env.BACKEND_URL}/driver/login`,
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    ApplicationSettings.setString("token",JSON.stringify(res.content.toJSON().access_token)) 
    console.log("From login:",res.content);
    ApplicationSettings.setString("driverId",JSON.stringify(res.content.toJSON().id))
     const driverId= ApplicationSettings.getString('driverId')
     const token= ApplicationSettings.getString('token')
    //  const jwtTokenGuard=new JwtTokenGuard()
    const resDelivery= await Http.request({
        url:`${process.env.BACKEND_URL}/delivery/driver/${driverId.split('"').join('')}`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization' : `Bearer ${token}`    
        }
      })
   // const resDelivery =await jwtTokenGuard.get(`${process.env.BACKEND_URL}/delivery/driver/${driverId.split('"').join('')}`)

const resDriver= await Http.request({
    url:`${process.env.BACKEND_URL}/driver/${driverId.split('"').join('')}`,
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`    
    }
  })
    ApplicationSettings.setString("name",JSON.stringify(resDriver.content.toJSON().name))
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