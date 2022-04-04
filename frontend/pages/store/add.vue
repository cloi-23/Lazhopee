<template>
  <div>
    <h1>Add Store</h1>
<div class="addLink"> 
    <nuxt-link :to="{name : 'store'}" >  Back</nuxt-link>
</div>
    <form @submit.prevent="add">
        <div class="mb-3">
        <label for="formFile" class="form-label">Logo:</label>
        <input class="form-control" type="file" id="formFile" name="file"  ref="fileData" @change="imgUpload" data-cy='file' required>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" data-cy='name' required>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Address: </label>
        <textarea  v-model="address" d="" cols="100" rows="10" data-cy='textarea' required></textarea>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Contact: </label>
        <input type="text" class="form-control"   v-model="contact" placeholder="Enter Contact" data-cy='contact' required>
        </div>
      
        <div class="col-12">
        <button type="submit" class="btn btn-primary" data-cy="add">Add</button>
    </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
const name = ref(null)
const contact = ref(null)
const address = ref(null)
const fileData = ref(null)
const image = ref(null)
const router  =  useRouter()
const config = useRuntimeConfig()

const imgUpload = ()=>{
  image.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }
 const add = async ()=>{
   try {
        const formData = new FormData();
         formData.append('file', image.value);
         const uploadResponse = await axios.post(`${config.BACKEND_URL}/upload`, formData, useJwtToken())
         image.value =uploadResponse.data
         const store ={
         name: name.value,
         address:address.value,
         contact:contact.value,
         image: `${config.BACKEND_URL}/upload/${image.value}`,
         
     }
     const res = await axios.post(`${config.BACKEND_URL}/store/add`, store ,useJwtToken())
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