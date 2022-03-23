import { 
  Http,
  fromObject,
  Observable,
  Frame,
  ApplicationSettings, 
  Dialogs} from "@nativescript/core";
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
  const username = obj.get('username')
  const password = obj.get('password')
  const name = obj.get('name')
  const address = obj.get('address')
  const contact = obj.get('contact')

try{
  const res = await Http.request({
      url:'http://172.22.18.26:3000/customer/',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          username,
          password,
          address,
          contact,
          name
      })
  })

  if(res.statusCode == 201){
    Dialogs.alert({
      title:"Register Successfuly",
      message:'Proceed to login page',
      cancelable:true,
      okButtonText:"ok"
  }).then(() => {
    const option = {
      moduleName: './login/login-page',
      clearHistory:true,
  }           
  Frame.topmost().navigate(option)
    })
    
  } else {
  Dialogs.alert({
    title:"Username Exist",
    message:'Choose different',
    cancelable:true,
    okButtonText:"ok"
})  
  }
}
catch (e) {
  console.log(e);
}

}

