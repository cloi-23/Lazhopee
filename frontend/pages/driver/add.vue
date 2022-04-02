<template>
  <div>
   
      <h1>Add Driver</h1>

       <div class="addLink"> 
        <nuxt-link :to="{name : 'driver'}" >  Back</nuxt-link>
    </div>
         <form @submit.prevent="add">
        <div class="mb-3">
        <label for="formFile" class="form-label">Photo:</label>
        <input class="form-control" type="file" id="formFile" name="file"  ref="fileData" @change="photoUpload" data-cy="file">
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" placeholder="lastname , firstname  middlename" data-cy="name" required>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Address:</label>
         <textarea  v-model="address" d="" cols="100" rows="10" data-cy="address" required></textarea>
        </div>
      
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Contact: </label>
        <input type="number" class="form-control"   v-model="contact" placeholder="ex. 09123456789 " data-cy="contact" required>
        </div>

          <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Device: </label>
        <input type="text" class="form-control"   v-model="device" placeholder="Enter Device" data-cy="device" required>
        </div>

        <div class="col-12">
        <button type="submit" class="btn btn-primary" data-cy="add">Add</button>
    </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
const name =  ref(null)
const address = ref(null)
const contact = ref(null)
const device = ref(null)
const fileData = ref(null)
const photo = ref(null)
const router = useRouter()
 const photoUpload = ()=>{
  photo.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }
const add = async () => {
   const formData = new FormData();
         formData.append('file', photo.value);
    
         const uploadResponse = await axios.post(`http://localhost:3000/upload`,formData)
         photo.value =uploadResponse.data
         
         const driver ={
         name: name.value,
         address:address.value,
         contact:contact.value,
         device:device.value,
         photo: `http://localhost:3000/upload/${photo.value}`,
         username:contact.value,
         password:"lazhopee-driver"
         
     }
       const res = await axios.post(`http://localhost:3000/driver/add`,driver)
       console.log(res.status); 
        name.value = null
        address.value = null
        contact.value = null
        device.value = null
        router.push({name:'driver'}) 
  }


</script>

<style>

</style>