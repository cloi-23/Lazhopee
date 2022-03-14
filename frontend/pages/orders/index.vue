<template>
<div>
  <button @click="$router.go(-1)">Back</button>
 <h2>Orders </h2>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
  </tr>
  <tr v-for="(list,index) in orders" :key="index">
    <td>{{ list.order.date }}</td>
    <td v-if="list.order.status === 'Pending'"><nuxt-link :to = "{ name: 'orders-id',params: {id: list.order['_id']} }">{{ list.customer.name }}</nuxt-link></td>
    <td v-else>{{ list.customer.name }}</td>
    <td>{{ list.customer.address }}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'

const limitPage = ref(10)
const route  = useRoute()
const page = ref(Number(route.query.page))
const prev =async ()=>{
page.value--
await load(limitPage.value,page.value)
}
const next = async ()=>{
page.value++
await load(limitPage.value,page.value)

}

const orders = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
    const res =  await axios.get(`http://localhost:3000/order`)
    orders.value = res.data
  } catch (error) {
    console.log(error);
  }
}

  await load()
</script>