<template>
  <div>
    <form @submit.prevent="send">
    <label>date</label><input type="text" v-model="date" data-cy="date"/>
    <label>status</label><input type="text" v-model="stats" data-cy="status"/>
    <label>customerId</label><input type="text" v-model="customerId" data-cy="customer"/>
    <label>productId</label><input type="text" v-model="productId" data-cy="productId"/>
    <label>sellingPrice</label><input type="text" v-model="sellingPrice" data-cy="sellingPrice"/>
    <label>quantity</label><input type="text" v-model="quantity" data-cy="quantity"/>
    <input type="submit" value="send" data-cy="send"/>
    </form>
    <input type="button" value="add" @click="push" data-cy="add"/>
    <hr/>
    <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
   <tbody  v-if="orders">
  <tr v-for="(list,index) in orders" :key="index"  v-show="list.status == 'Shipping'">
  <div >{{index}}</div>
    <td><date-formatter :timestamp="list.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list['_id']} }" data-cy="view">{{ list.name }}</nuxt-link></td>
    <td>{{ list.address }}</td>
    <td>{{ list.status }}</td>
    <td >
  <button @click="updateStatus(index)" v-if="list.status === 'Pending' || 'Shipping'" data-cy="sendStatus">send</button>
  </td>
 
  </tr>
  </tbody>
  </table>
    <div v-show="false">
      <button @click="rmvDel" data-cy="rmvDel">Remove deliveries</button>
      <button @click="rmvOrd" data-cy="rmvOrd">Remove orders</button>
      <button @click="rmvSto" data-cy="rmvSto">Remove store</button>
      <button @click="rmvPro" data-cy="rmvPro">Remove products</button>
      <button @click="rmvExp" data-cy="rmvExp">Remove products</button>
      <button @click="rmvDri" data-cy="rmvDri">Remove Driver</button>
    </div>
  </div>

</template>
<script setup lang="ts">
import axios from 'axios'

  let customerId = ref(null)
  let productId = ref(null)
  let sellingPrice = ref(null)
  let quantity = ref(null)
  let date = ref(null)
  let stats = ref(null)


  const token =  typeof window !== 'undefined' ? localStorage.getItem('token') : null
    let config = {
    headers: { 
      Authorization: `Bearer ${token}` 
      }
    }

const rmvSto = () => axios.delete(`http://localhost:3000/store/del/last`,config)
const rmvPro = () => axios.delete(`http://localhost:3000/product/del/last`,config)
const rmvExp = () => axios.delete(`http://localhost:3000/expense/del/last`,config)
const rmvDri = () => axios.delete(`http://localhost:3000/driver/del/last`)

const delivery = ref(null)
const deliveries = async() => {
  try {
    const res = await axios.get('http://localhost:3000/delivery',config)
    delivery.value = res.data
  } catch (error) {
    console.error(error);
  }
}
await deliveries()

const createdOrder = ref(null)
const order = async() => {
  try {
    const res = await axios.get('http://localhost:3000/order',config)
    createdOrder.value = res.data
  } catch (error) {
    console.error(error);
  }
}
await order()

const rmvDel = () => {
  for (let deliver of delivery.value) {
    axios.delete(`http://localhost:3000/delivery/${deliver._id}`,config)
  }
} 
const rmvOrd = () => {
  for (let order of createdOrder.value) {
    axios.delete(`http://localhost:3000/order/${order._id}`,config)
  }
} 

  let orderData = {
    date: new Date(),
    status: 'Pending',
    customerId:'',
    articles:[]
    }

  const push = () => {
    orderData.articles.push({
      productId:productId.value,
      sellingPrice:sellingPrice.value,
      quantity:quantity.value
    })
  }
  const send = () => {
    orderData.date = date.value || new Date()
    orderData.status = stats.value || 'Pending'
    orderData.customerId = customerId.value
    axios.post('http://localhost:3000/order',orderData,config)
    orderData.articles = []
  }

  const orders = ref(null)
  const load = async() =>{
  try {
      const res =  await axios.get(`http://localhost:3000/order`,config)
      orders.value = res.data
  } catch (error) {
      console.log(error);
  }
}
 await load()
  
  const updateStatus = async(index) => {
  const orderId = orders.value[index]['_id']
    await axios.patch(`http://localhost:3000/order/${orderId}`,{
    status: 'Success'
  },useJwtToken()) 
  await load()
}
</script>