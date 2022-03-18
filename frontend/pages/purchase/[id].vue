<template>
  <div>
      <h1>Purchase</h1>
        <div class="addLink"> 
        <nuxt-link :to="{name : 'purchase'}" >  Back</nuxt-link>
    </div>
    <div class="sub-title">
     <ul>
       <li>Store : {{purchaseList.store}}</li>
       <li>Date : <date-formatter :timestamp="purchaseList.dateOfPurchase"/></li>
     </ul>
     </div>
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