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
        //adb reverse tcp:5000 tcp:5000
        console.log("login");
        
        const username =this.username
        const password =this.password
   try {
   const res= await Http.request({
        url:"http://172.19.168.244:3000/customer/login",
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        content:JSON.stringify({username:username,password:password})
    })
    // const resProduct = await Http.request({
    //     url:"http://172.19.161.96:3000/product/",
    //     method:'GET',
    // })
    // ApplicationSettings.setString("productList",JSON.stringify(resProduct.content))
    ApplicationSettings.setString("customerId",JSON.stringify(res.content.toJSON().id))
    
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
    Dialogs.alert({
        title:"Lazhopee App",
        message:'Wrong Input',
        cancelable:true,
        okButtonText:"ok"
    })
   }
    }
 
 
    
}