<template>
  <div>
   
    <h1>Add Product</h1>
    <div class="addLink"> 
        <nuxt-link :to="{name : 'product'}" >  Back</nuxt-link>
    </div>
    <form @submit.prevent="add">
        <div class="mb-3">
        <label for="formFile" class="form-label">Image:</label>
        <input class="form-control" type="file" id="formFile" name="file"  ref="fileData" @change="imgUpload" data-cy="file" required>
        </div>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" data-cy="name" required>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Category:</label>
        <input type="text" class="form-control" v-model="category" placeholder="Enter Name" data-cy="category" required>
        </div>
     <div class="mb-3">
             <label for="floatingTextarea2">Description</label>
             <textarea  v-model="description"  cols="100" rows="10" data-cy="description" required></textarea>
      
     
        </div>
       <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">Store</label>
        <select class="form-select"  v-model="store" data-cy="store" >
            <option selected>Choose...</option>
            <option v-for="(store,index) in storeList"  :key="index" :value="store._id" :data-thumbnail="store.image">
             {{store.name}}</option>
            
        </select>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Selling Price: </label>
        <input type="number" class="form-control"   v-model="sellingPrice" placeholder="Enter Amount" data-cy="sellingPrice" required>
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
const store = ref(null)
const sellingPrice = ref(null)
const fileData = ref(null)
const image = ref(null)
const category = ref(null)
const description = ref(null)
const router = useRouter()
const config = useRuntimeConfig()

 const imgUpload = ()=>{
  image.value = fileData.value.files[0];
      console.log(fileData.value.files[0]);
 }

 const add = async () => {
     try {
          const formData = new FormData();
         formData.append('file', image.value);
    
         const uploadResponse = await axios.post(`${config.BACKEND_URL}/upload`, formData, useJwtToken())
         image.value =uploadResponse.data
         const product ={
         name: name.value,
         storeId:store.value,
         category:category.value,
         sellingPrice:sellingPrice.value,
         image: `${config.BACKEND_URL}/upload/${image.value}`,
         description:description.value
         
     }
   
     const res = await axios.post(`${config.BACKEND_URL}/product/add`, product, useJwtToken())
      console.log(res.status); 
         name.value = null
         store.value = null
         sellingPrice.value = null
         category.value = null
         description.value = null 
        router.push({name:'product'}) 
     } catch (error) {
         
     }
 }
const { data:storeList } =  await axios.get(`${config.BACKEND_URL}/store`,useJwtToken())


</script>

<style>

</style>