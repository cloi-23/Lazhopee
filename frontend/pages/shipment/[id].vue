<template>
<div>
  <button @click="$router.go(-1)">Back</button>
  <div>
  <h2>Order details by customer</h2>

  <table>
  <tr>
    <th>Unit </th>
    <th>Description </th>
    <th>Unit Price</th>
    <th>Sub Total</th>
  </tr>
  <tr v-for="order in details.articles">
    <td>{{ order.quantity }}</td>
    <td>{{ order.name }}</td>
    <td>{{ order.price }}</td>
    <td>{{ order.quantity*order.price }}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
const route = useRoute()

  const { data: details } = await axios.get(`http://localhost:3000/order/product/${route.params.id}`)

  
</script>