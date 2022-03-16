<template>
  <div>
      <h1>Purchase</h1>

     <ul>
       <li>Store : {{purchaseList.store}}</li>
       <li>Date : <date-formatter :timestamp="purchaseList.dateOfPurchase"/></li>
     </ul>
      <list-purchase :purchaseList="purchaseList"/>
  </div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute()
const {data: purchaseList} = await axios.get(`http://localhost:3000/purchase/list/${route.params.id}`)
</script>

<style>

</style>