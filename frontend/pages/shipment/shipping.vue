<template>
<div>
 <h1>Shipping </h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Driver</th>
    <th>Action</th>
  </tr>
    
  <tr v-for="(list,index) in orders" :key="index"  v-show="list.order.status == 'Shipping'">
  <div v-show="false">{{index}}</div>
    <td>{{ list.order.date }}</td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list.order['_id']} }">{{ list.customer.name }}</nuxt-link></td>
    <td>{{ list.customer.address }}</td>
    <td>{{ list.order.status }}</td>
       <td v-if="list.order.status !== 'Pending'">{{ driverOn(list.order['_id']) }}</td>
    <td> 
  <button @click="sendData(index)" v-if="list.order.status === 'Pending'">send</button>
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
const router = useRouter()

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
  const orderId = orders.value[index].order['_id']
  const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    await axios.post('http://localhost:3000/delivery', {
      orderId: orderId,
      driverId: driver[0]['_id']
    })
    await axios.patch(`http://localhost:3000/order/${orderId}`, {
    status: 'Shipping'
  }) 
    location.reload()
}

  const { data: delivery } = await axios.get('http://localhost:3000/delivery')
  
  const driverOn = (orderId) => {
    const driverId = delivery.filter(x => x.orderId == orderId)[0].driverId
    const driverName = drivers.value.filter(x => x['_id'] === driverId)[0].name
    return driverName
  }

  const updateData = async(index) => {
    const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    const driverId = driver[0]['_id']
     axios.patch(`http://localhost:3000/delivery/${delivery[index]['_id']}`,{
      driverId: driverId
    })
    router.push({name:'shipment-shipping'})
  }

</script>