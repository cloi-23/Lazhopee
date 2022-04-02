import { 
  Http,
  fromObject,
  Observable,
  Frame,
  ApplicationSettings, 
  Dialogs} from "@nativescript/core";
import { validEmail } from './emailValidator'
let errorMessage = null
const obj:Observable = fromObject({
  username: "",
  password: "",
  name: "",
  contact: "",
  address: "",

})

export function myPageWasLoaded(args) {
  const page = args.object
  page.bindingContext = obj
  errorMessage = page.getViewById('errMsg')
} 
export function backButton() {    
  Frame.goBack()
  Frame.topmost().navigate('./login/login-page')
}

export async function register() {  
  let username = obj.get('username')
  let password = obj.get('password')
  let name = obj.get('name')
  let address = obj.get('address')
  let contact = obj.get('contact')
  let email = obj.get('email')
  
if(validEmail(email) && username.length >= 5 && password.length >= 5 && address && contact) {
try{
  const res = await Http.request({
      url:'http://172.20.188.182:3000/customer/',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          username,
          email,
          password,
          address,
          contact,
          name
      })
  })

  if(res.statusCode == 201){
    Dialogs.alert({
      title:"Register Successfuly",
      message:'Verification to your email',
      cancelable:true,
      okButtonText:"ok"
  }).then(() => {
    const option = {
      moduleName: './login/login-page',
      clearHistory:true,
  }           
  Frame.topmost().navigate(option)
    })  
    console.log('Username or Password length must be 5 or more');
    
  }
}
catch (e) {
  console.log(e);
}
  } else if ( username.length < 5 || password.length < 5) {
  errorMessage.text = 'Username or Password must be 5 characters or more'
  } else if (validEmail(email) === false){
    errorMessage.text = 'Input Valid Email Address'
  }else {
  errorMessage.text = 'All fields must meet the requirements'
  }
}

