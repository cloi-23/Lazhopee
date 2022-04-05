<template>
  <div>
    <form @submit.prevent="send">
    <label>customerId</label><input type="text" v-model="customerId" data-cy="customer"/>
    <label>productId</label><input type="text" v-model="productId" data-cy="productId"/>
    <label>sellingPrice</label><input type="text" v-model="sellingPrice" data-cy="sellingPrice"/>
    <label>quantity</label><input type="text" v-model="quantity" data-cy="quantity"/>
    <input type="submit" value="send" data-cy="send"/>
    </form>
    <input type="button" value="add" @click="push" data-cy="add">
    <hr>
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
  <div v-show="false">{{index}}</div>
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
  </div>

   
</template>
<script setup>
import axios from 'axios'

  let customerId = ref(null)
  let productId = ref(null)
  let sellingPrice = ref(null)
  let quantity = ref(null)

  let data = {
    customerId:customerId.value,
    articles:[]
    }
  const token =  typeof window !== 'undefined' ? localStorage.getItem('token') : null
    let config = {
    headers: { 
      Authorization: `Bearer ${token}` 
      }
    }
  const push = () => {
    data.articles.push({
      productId:productId.value,
      sellingPrice:sellingPrice.value,
      quantity:quantity.value
    })
  }
  const send = () => {
    data.customerId = customerId.value
    axios.post('http://localhost:3000/order',data,config)
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