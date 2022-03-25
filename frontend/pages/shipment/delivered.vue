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
    <td><nuxt-link :to = "{ name: 'shipment-id',params: { id: order.orderId } }">{{ order.customerName }}</nuxt-link></td>
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
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia';
const limitPage = ref(10)
const route  = useRoute()
const router  = useRouter()

const page = ref(Number(route.query.page))
const prev =async ()=>{
page.value--
await load(limitPage.value,page.value)
}
const next = async ()=>{
page.value++
await load(limitPage.value,page.value)
}

const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
  let config = {
    headers: { 
      Authorization: `Bearer ${token.value}` 
      }
    }
const orders = ref(null)
const  load = async(limit=limitPage.value,offset=page.value) =>{
  try {
      const res = await  axios.get(`http://localhost:3000/delivery/order/shipping`, config)
      orders.value = res.data
  } catch (error) {
      router.push({name: 'index'})
      console.log(error);
  }
}
await load()



 

</script>