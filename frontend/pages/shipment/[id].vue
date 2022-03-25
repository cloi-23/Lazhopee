<template>
<div>
  
  <div >
  <h1> Customer Name:  {{details.name}}</h1>
<button @click="$router.go(-1)" class="addLink">Back</button>
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
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia'
const route = useRoute()
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
  const details = ref(null)
    let config = {
  headers: { 
    Authorization: `Bearer ${token.value}` 
    }
  }
  let res = await axios.get(`http://localhost:3000/order/details/${route.params.id}`,config)
  if(res.status == 200) {
      details.value = res.data
  } else {
      console.log(res);
  }
</script>