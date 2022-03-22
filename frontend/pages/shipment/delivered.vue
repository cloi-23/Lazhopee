<template>
<div>
 <h1>Delivered </h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Driver</th>
  
  </tr>
    
  <tr v-for="(list,index) in orders" :key="index"  v-show="list.order.status == 'Success' || list.order.status == 'Failed'">
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="list.order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list.order['_id']} }">{{ list.customer.name }}</nuxt-link></td>
    <td>{{ list.customer.address }}</td>
    <td>{{ list.order.status }}</td>
       <td v-if="list.order.status !== 'Pending'">{{ driverOn(list.order['_id']) }}</td>
    <td> 
  <button @click="sendData(index)" v-if="list.order.status === 'Pending'">send</button>


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
   await load()
}
  const delivery = ref('')
  const delivers = async() => {
    const res = await axios.get('http://localhost:3000/delivery')
    delivery.value = res.data
  }
  await delivers()
  
  const driverOn = (orderId) => {
    const driverId = delivery.value.filter(x => x.orderId == orderId)[0].driverId
    const driverName = drivers.value.filter(x => x['_id'] === driverId)[0].name
    return driverName
  }

  const updateData = async(index) => {
    const driver = drivers.value.filter(x => x.name === selectedDriver.value); 
    const driverId = driver[0]['_id']
     const res = axios.patch(`http://localhost:3000/delivery/${delivery.value[index]['_id']}`,{
      driverId: driverId
    })
     await load()
     await delivers()
  }

</script>