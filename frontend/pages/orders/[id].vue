<template>
<div>
  <button @click="routeBack">Back</button>
  <div>
  <h2>Order details by customer</h2>
  <div>
  <button @click="sendData">send</button> to driver
  <select v-model="selectedDriver" @change="onChange()" >
    <option v-for="driver in drivers" :value="driver.name" >{{driver.name}}</option>
  </select>
  </div>
  <table>
  <tr>
    <th>Unit </th>
    <th>Description </th>
    <th>Unit Price</th>
    <th>Sub Total</th>
  </tr>
  <tr v-for="order in details">
    <td>{{ order.quantity }}</td>
    <td>{{ order.name }}</td>
    <td>{{ order.price }}</td>
    <td>{{ order.quantity*order.price }}</td>
  </tr>
  </table>
  </div>
</div>
</template>
<script setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()

const routeBack = () => {
  router.push('/orders')
}

  const { data: details } = await axios.get(`http://localhost:3000/order/${route.params.id}`)

  const { data: drivers } = await axios.get(`http://localhost:3000/driver/`)

  const forStatus = async() => await axios.patch(`http://localhost:3000/order/${route.params.id}`, {
   status: 'Shipping'
 }) 

  onBeforeUnmount(() => {
  location.reload()
  })

  const selectedDriver = ref('')
  const onChange = () => {
    return selectedDriver.value;
  }
  
  const sendData = async() => {
  const driver = drivers.filter(x => x.name === selectedDriver.value); 
    await axios.post('http://localhost:3000/delivery', {
      orderId: route.params.id,
      driverId: driver[0]['_id']
    })
    forStatus()
    routeBack()
  }

</script>