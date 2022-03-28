<template>
<div>
      <div class="center">
      <h1>Login</h1>
       <span style="text-align:center; color: brown;">{{ response }}</span> 
     <form @submit.prevent="login">
        <div class="txt_field">
          <input  type="text" v-model="username" required>
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input  type="password" v-model="password" required>
          <span></span>
          <label>Password</label>
        </div>
    
        <input type="submit" value="Login">
      </form>
      
    </div>
    </div>
</template>
<script setup>
import { tokenJWT } from '../store/token'
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import axios from 'axios'
const router = useRouter()
definePageMeta({layout:'login'})

let username=ref('');
let password=ref('');
let response=ref('');
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
const login = async() => {
try {
  const res = await axios.post('http://localhost:3000/auth',{
    username: username.value,
    password: password.value
  })
    myToken.add(res.data.access_token)
    console.log(token.value,'index');
    username.value = ''
    password.value = ''
    if (res.status !== 201) {
      response.value = 'username or password is not correct'
    }
    router.push({name:'dashboard'})
  } catch (e) {
      response.value = 'username or password is not correct'
    console.log(e);
  }
}


</script>
<style scoped>


.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #ffbf00;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
}
.center h1{
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #fff;
  color: #fff;
}
.center form{
  padding: 0 40px;
  box-sizing: border-box;
}
form .txt_field{
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.txt_field input{
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.txt_field label{
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s;
}
.txt_field span::before{
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #fff;
  transition: .5s;
}
.txt_field input:focus ~ label,
.txt_field input:valid ~ label{
  top: -7px;
  color: #fff;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before{
  width: 100%;
}
.pass{
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
}
.pass:hover{
  text-decoration: underline;
}
input[type="submit"]{
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #e9f4fb;
  border-radius: 25px;
  font-size: 18px;
  color: #ffbf00;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  margin: 30px 0
}
input[type="submit"]:hover{
  border-color: #e9f4fb;
  transition: .5s;
}
.signup_link{
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link a{
  color: #ffbf00;
  text-decoration: none;
}
.signup_link a:hover{
  text-decoration: underline;
}

</style>