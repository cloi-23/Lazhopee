<template>
<div>
 <h1> {{ status }} </h1>
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
    
  <tr v-if="orders" v-for="(order,index) in orders" :key="index"  v-show="order.status == status">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: order['_id']} }">{{ order.customerName }}</nuxt-link></td>
    <td>{{ order.customerAddress }}</td>
    <td>{{ order.status }}</td>
       <td v-if="order.status !== 'Pending'">{{ order.driverName }}</td>
    <td> 
  <button @click="sendData(index)" v-if="order.status === 'Pending'">send</button>
  <button @click="updateData(index)" v-else>update</button>
  <select v-model="selectedDriver" >
    <option v-for="(driver, index) in drivers" :value="driver.name" :key="index">{{driver.name}}</option>
  </select>
  </td>
 
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
defineProps({
  status: String
})

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
      const res =  await axios.get(`http://172.19.168.244:3000/delivery/order/show`)
      orders.value = res.data
  } catch (error) {
      console.log(error);
  }
}
  await load()

  const drivers = ref(null)
  const getDrivers = async() => {
    try {
      const res = await axios.get(`http://localhost:3000/driver/`)
      drivers.value = res.data
    } catch (error) {
      console.log(error);
    }
  }
  getDrivers()

  const selectedDriver = ref('')
  const sendData = async(index) => {
  const orderId = orders.value[index]['_id']
  const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    await axios.post('http://localhost:3000/delivery', {
      orderId: orderId,
      driverId: driver[0]['_id']
    })
    await axios.patch(`http://localhost:3000/order/${orderId}`, {
    status: 'Shipping'
  }) 
   await load()
}
  // const delivery = ref('')
  // const delivers = async() => {
  //   const res = await axios.get('http://localhost:3000/delivery')
  //   delivery.value = res.data
  // }
  // await delivers()
  
  
  
  const updateData = async(index) => {
    const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    const driverId = driver[0]['_id']
     const res = axios.patch(`http://localhost:3000/delivery/${delivery.value[index]['_id']}`,{
      driverId: driverId
    })
     await load()
  }

</script>