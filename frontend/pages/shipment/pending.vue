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
  <tr v-for="(list,index) in orders" :key="index"  v-show="list.order.status == 'Pending'">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="list.order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list.order['_id']} }" data-cy="view">{{ list.customer.name }}</nuxt-link></td>
    <td>{{ list.customer.address }}</td>
    <td>{{ list.order.status }}</td>
    <td>
  <button @click="sendData(index)" v-if="list.order.status === 'Pending'">send</button>
  <select v-model="selectedDriver" >
    <option v-for="(driver, index) in drivers" :value="driver.name" :key="index">{{driver.name}}</option>
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
import { mapActions, storeToRefs } from 'pinia';
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
  
const reToken = () => {
  myToken.$patch({ token: token.value
  })
}
reToken()

const orders = ref(null)
const load = async(limit=limitPage.value,offset=page.value) =>{
  try {
      const res =  await axios.get(`http://localhost:3000/order`,config)
      orders.value = res.data
  } catch (error) {
      return error
  }
}
 load()

  const drivers = ref(null)
  const getDrivers = async() => {
    try {
      const res = await axios.get(`http://localhost:3000/driver/`,config)
      drivers.value = res.data
    } catch (error) {
      return error
    }
  }
  getDrivers()

  const selectedDriver = ref('')
  const sendData = async(index) => {
  const orderId = orders.value[index].order['_id']
  const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    await axios.post('http://localhost:3000/delivery',{
      orderId: orderId,
      driverId: driver[0]['_id']
    },config)
    await axios.patch(`http://localhost:3000/order/${orderId}`,{
    status: 'Shipping'
  },config) 
  await load()
  await getDrivers()
}
</script>