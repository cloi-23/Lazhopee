<template>
  <div>
   
    <h1>Add Expense</h1>
    <div class="addLink"> 
        <nuxt-link :to="{name : 'expense'}" >  Back</nuxt-link>
    </div>
    <form @submit.prevent="add">
          <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Date:</label>
        <input type="date" class="form-control" v-model="date" placeholder="Enter Name" data-cy="date" required>
        </div>
    
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Name:</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" data-cy="name" required>
        </div>
         <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Cost: </label>
        <input type="number" class="form-control"   v-model="cost" placeholder="Enter Amount" data-cy="cost" required>
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
const date = ref(null)
const cost = ref(null)
const router = useRouter()
 const add = async () => {
     try {
       
         const expense ={
         name: name.value,
         date:date.value,
         cost:cost.value,
     }

     const res = await axios.post(`http://localhost:3000/expense/add`,expense, useJwtToken())
      console.log(res.status); 
         name.value = null
         date.value = null
         cost.value = null
        router.push({name:'expense'}) 
     } catch (error) {
         
     }
 }


</script>

<style>

</style>