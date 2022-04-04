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
  <button @click="sendData(index)" v-if="order.status === 'Pending'" >send</button>
  <button @click="updateData(order._id)" v-else data-cy="update">update</button>
  <select v-model="selectedDriver" data-cy="driver">
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
      const { data } = await  axios.get(`${config.BACKEND_URL}/delivery/order/shipping`,useJwtToken())
      orders.value = data 
      console.log(data);
  } catch (error) {
     router.push({name: 'index'})
      console.log(error);
  }
}
 await load()

  const drivers = ref(null)
  const getDrivers = async() => {
    try {
      const  { data }  = await axios.get(`${config.BACKEND_URL}/driver/`,useJwtToken())
      drivers.value = data 
    } catch (error) {
       router.push({name: 'index'})
      console.log(error);
    }
  }
  getDrivers()
  const selectedDriver = ref('')
  const updateData = async(id) => {
    try {
     const res = axios.patch(`${config.BACKEND_URL}/delivery/${id}`,{
      driverId: selectedDriver.value
    }, useJwtToken())
    setTimeout(() => {
      load()
    }, 500);
    } catch (error) {
       router.push({name: 'index'})
      console.log(error);
    }
  }
</script>