<template>
<div>
 <h1> Shipping </h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th v-if="$route.path === '/shipment/shipping'">Driver</th>
    <th>Action</th>
  </tr>
  <tbody  v-if="orders">
  <tr  v-for="(order,index) in orders" :key="index"  v-show="order.status == 'Shipping'">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: { id: order.orderId } }" data-cy="view">{{ order.customerName }}</nuxt-link></td>
    <td>{{ order.customerAddress }}</td>
    <td>{{ order.status }}</td>
       <td v-if="order.status !== 'Pending'">{{ order.driverName }}</td>
    <td> 
  <button @click="sendData(index)" v-if="order.status === 'Pending'">send</button>
  <button @click="updateData(order._id)" v-else>update</button>
  <select v-model="selectedDriver" >
    <option v-for="(driver, index) in drivers" :value="driver._id" :key="index">{{driver.name}}</option>
  </select>
  </td>
 
  </tr>
  </tbody>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia'
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
      const res = await  axios.get(`http://localhost:3000/delivery/order/shipping`,config)
      orders.value = res.data
      console.log(res.data);
  } catch (error) {
      console.log(error);
  }
}
 await load()

  const drivers = ref(null)
  const getDrivers = async() => {
    try {
      const res = await axios.get(`http://localhost:3000/driver/`,config)
      drivers.value = res.data
    } catch (error) {
      console.log(error);
    }
  }
  getDrivers()
  
  const selectedDriver = ref('')
  const updateData = async(id) => {
     const res = axios.patch(`http://localhost:3000/delivery/${id}`,{
      driverId: selectedDriver.value
    }, config)
    setTimeout(() => {
      load()
    }, 500);
    
  }
</script>