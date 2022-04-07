import { ApplicationSettings, Http } from "@nativescript/core";

const token = JSON.parse(ApplicationSettings.getString('token'))

export  class JwtTokenGuard{
  private header:{}
constructor(){
  this.header = {
    'Content-Type':'application/json',
    'Authorization' : `Bearer ${token}`    
  }
}
 async get(url){
  const response= await Http.request({
    url:url,
    method:'GET',
   headers:this.header
  })
  console.log(`response \n`,response);
  
  return response
}

 async patch(url,content){
  return await Http.request({
    url:url,
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`    
    },
    content:JSON.stringify({
      status: content,
    })
  })
}



}