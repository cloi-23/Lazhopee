<template>
  <div>
    <h1>Add Store</h1>
<div class="addLink"> 
    <nuxt-link :to="{name : 'store'}" >  Back</nuxt-link>
</div>
    <form @submit.prevent="add">
        <div class="mb-3">
        <label for="formFile" class="form-label">Logo:</label>
        <input class="form-control" type="file" id="formFile" name="file"  ref="fileData" @change="imgUpload" required>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" required>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Address: </label>
        <textarea  v-model="address" d="" cols="100" rows="10" required></textarea>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Contact: </label>
        <input type="text" class="form-control"   v-model="contact" placeholder="Enter Contact" required>
        </div>
      
        <div class="col-12">
        <button type="submit" class="btn btn-primary">Add</button>
    </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia'
const name = ref(null)
const contact = ref(null)
const address = ref(null)
const fileData = ref(null)
const image = ref(null)
const router  =  useRouter()
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
 const imgUpload = ()=>{
  image.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }
    let config = {
  headers: { 
    Authorization: `Bearer ${token.value}` 
    }
  }
 const add = async ()=>{
   try {
        const formData = new FormData();
         formData.append('file', image.value);
    
         const uploadResponse = await axios.post(`http://localhost:3000/upload`, formData, config)
         image.value =uploadResponse.data
         const store ={
         name: name.value,
         address:address.value,
         contact:contact.value,
         image: `http://localhost:3000/upload/${image.value}`,
         
     }
   
   
     const res = await axios.post(`http://localhost:3000/store/add`, store ,config)
      console.log(res.status); 
      name.value = null
      address.value = null
      contact.value = null
  
    router.push({name:"store"})

   } catch (error) {
       console.log(error);
       
   }
 }

</script>

<style>

</style>