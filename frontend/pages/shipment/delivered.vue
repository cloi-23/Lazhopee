<template>
<div>
 <h1> Delivered </h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Driver</th>
  </tr>
  <tbody  v-if="orders">
  <tr v-for="(order,index) in orders" :key="index"  v-show="order.status == 'Success' || order.status == 'Failed'">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: { id: order.orderId } }" data-cy="view">{{ order.customerName }}</nuxt-link></td>
    <td>{{ order.customerAddress }}</td>
    <td>{{ order.status }}</td>
       <td >{{ order.driverName }}</td>

 
  </tr>
  </tbody>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
const limitPage = ref(10)
const route  = useRoute()
const router  = useRouter()
const config = useRuntimeConfig()

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
const  load = async(limit=limitPage.value,offset=page.value) =>{
  try {
      // for development
      const { data } = await  axios.get(`${config.BACKEND_URL}/delivery/order/shipping`, useJwtToken())
      orders.value = data

      // const { data } = await  axios.get(`../../cypress/fixtures/successOrders.json`)
      // orders.value = data.orders
  } catch (error) {
      router.push({name: 'index'})
      console.log(error);
  }
}
await load()



 

</script>