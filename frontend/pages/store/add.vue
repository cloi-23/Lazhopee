<template>
  <div>
       <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </Head>
    <h1>Add Store</h1>

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
        <input type="text" class="form-control"   v-model="address" placeholder="Enter Address" required>
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
const name = ref(null)
const contact = ref(null)
const address = ref(null)
const fileData = ref(null)
const image = ref(null)
const router  =  useRouter()

 const imgUpload = ()=>{
  image.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }
 const add = async ()=>{
   try {
        const formData = new FormData();
         formData.append('file', image.value);
    
         const uploadResponse = await axios.post(`http://localhost:3000/upload`,formData)
         image.value =uploadResponse.data
         const store ={
         name: name.value,
         address:address.value,
         contact:contact.value,
         image: `http://localhost:3000/upload/${image.value}`,
         
     }
   
   
     const res = await axios.post(`http://localhost:3000/store/add`,store)
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