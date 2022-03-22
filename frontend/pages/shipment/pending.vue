<template>
<div>
<<<<<<< HEAD
 <h1>Pending</h1>
  <div>
  <table>
  <tr>
    <th>Date </th>
    <th>Customer Name</th>
    <th>Customer Address</th>
    <th>Status</th>
    <th>Driver</th>
  </tr>
 <tr v-for="(list,index) in orders" :key="index" v-show="list.order.status == 'Pending'"> 
  <div v-show="false">{{index}}</div>
    <td><date-formatter :timestamp="list.order.date"/></td>
    <td><nuxt-link :to = "{ name: 'shipment-id',params: {id: list.order['_id']} }">{{ list.customer.name }}</nuxt-link></td>
    <td>{{ list.customer.address }}</td>
    <td>{{ list.order.status }}</td>
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
=======
  <DeliveryStatus :status='status'/>

>>>>>>> 2a3d51d4b6f6fff92b1187cb7dbe10ae8cf48396
</div>
</template>
<script setup>
  const status = 'Pending'
</script>