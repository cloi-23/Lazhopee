<template>
<div>
 <h1> Pending </h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
   <tbody  v-if="orders">
  <tr v-for="(list,index) in orders" :key="index"  v-show="list.status == 'Pending'">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="list.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list['_id']} }" data-cy="view">{{ list.name }}</nuxt-link></td>
    <td>{{ list.address }}</td>
    <td>{{ list.status }}</td>
    <td >
  <button @click="sendData(index)" v-if="list.status === 'Pending'" data-cy="send">send</button>
  <select v-model="selectedDriver" data-cy="driver">
    <option v-for="(driver, index) in drivers" :value="driver.name" :key="index" >{{driver.name}}</option>
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
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
      // for development
      const res =  await axios.get(`${config.BACKEND_URL}/order`,useJwtToken())
      orders.value = res.data

      // for testing
      // const res =  await axios.get(`../../cypress/fixtures/orders.json`)
      // orders.value = res.data.order
  } catch (error) {
     router.push({name: 'index'})
      return error
  }
}
 await load()

  const drivers = ref(null)
  const getDrivers = async() => {
    try {
      const res = await axios.get(`${config.BACKEND_URL}/driver/`,useJwtToken())
      drivers.value = res.data
    } catch (error) {
       router.push({name: 'index'})
      return error
    }
  }
  await getDrivers()
  
  const selectedDriver = ref('')
  const sendData = async(index) => {
  const orderId = orders.value[index]['_id']
  const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    await axios.post(`${config.BACKEND_URL}/delivery`,{
      orderId: orderId,
      driverId: driver[0]['_id']
    },useJwtToken())
    await axios.patch(`${config.BACKEND_URL}/order/${orderId}`,{
    status: 'Shipping'
  },useJwtToken()) 
  await load()
  await getDrivers()
}
</script>