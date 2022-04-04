<template>
  <div>
      <h1>Customer</h1>
       <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                   <th>Contact</th>
                   <th>Username</th>
                  </tr>
          </thead>
          <tbody v-if="customerList">
            <tr v-for="(customer,index)  in customerList" :key="index">
                <td>{{index+1}} </td>
                 <td>{{customer.name}}</td>
                 <td>{{customer.address}}</td>
                  <td>{{customer.contact}}</td>
                   <td>{{customer.username}}</td>
                   
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
const router = useRouter()
const config = useRuntimeConfig()
 const customerList = ref(null)
 
  try {
    const { data } = await axios.get(`${config.BACKEND_URL}/customer`,useJwtToken())
    customerList.value= data
 
  } catch (error) {
     router.push({ name: 'index'})
        console.log(error);
  }
  
</script>
