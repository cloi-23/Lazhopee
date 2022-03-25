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
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
  let config = {
  headers: { 
    Authorization: `Bearer ${token.value}` 
    }
  }
const route = useRoute()

  const purchaseList = ref(null)
  let res = await axios.get(`http://localhost:3000/purchase/list/${route.params.id}`,config)
  if(res.status == 200) {
      purchaseList.value = res.data
  } else {
      console.log(res);
  }
</script>

<style>

</style>