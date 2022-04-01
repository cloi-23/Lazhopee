<template>
<div>
  
  <div >
  <h1> Customer Name:  {{details.name}}</h1>
<button @click="$router.go(-1)" class="addLink" data-cy="back">Back</button>
  <table>
  <tr>
    <th>Image</th>
    <th>Unit </th>
    <th>Description </th>
    <th>Unit Price</th>
    <th>Sub Total</th>
  </tr>
  <tr v-for="(order,index) in details.articles" :key="index">
    <td><img :src='order.image' :alt="order.name" width="100" height="100"></td>
    <td>{{ order.quantity }}</td>
    <td>{{ order.name }}</td>
    <td><currency-formatter :amount="order.sellingPrice"/>  </td>
    <td><currency-formatter :amount="order.quantity*order.sellingPrice"/></td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
const route = useRoute()
const router  = useRouter()

const details = ref(null)
try {
   const { data } = await axios.get(`http://localhost:3000/order/details/${route.params.id}`,useJwtToken())
    details.value = data
} catch (error) {
     router.push({name: 'index'})
     console.log(error);
}
 
  
</script>