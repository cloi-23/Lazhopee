import { 
    Http,
    fromObject,
    Observable,
    Frame,
    ApplicationSettings } from "@nativescript/core";
let errorMessage = null
const obj:Observable = fromObject({
    username: "user1",
    password: "user1",
})

export function myPageWasLoaded(args) {
    const page = args.object
    page.bindingContext = obj
    errorMessage = page.getViewById('errMsg')
} 

export function backButton() {    
    Frame.goBack()
}

export async function loginUser() {
    const username = obj.get('username')
    const password = obj.get('password')

try{
    const res = await Http.request({
        url:'http://172.25.144.219:3000/customer/login',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            username,
            password
        })
    })
    
    const { status, id, message } = res.content.toJSON()
    if(status === 'ok'){
        ApplicationSettings.setString('user', JSON.stringify(id))
        const option = {
            moduleName: './browse/browse-page',
            clearHistory:true,
        }       
        
        Frame.topmost().navigate(option)
    }
    errorMessage.text = message  
}
catch (e) {
    console.log(e);
}
    obj.set('username','')
    obj.set('password','')
}

