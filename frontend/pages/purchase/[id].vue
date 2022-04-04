<template>
  <div>
      <h1>Purchase</h1>
        <div class="addLink"> 
        <nuxt-link :to="{name : 'purchase'}" data-cy="back">  Back</nuxt-link>
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
const router  = useRouter()
const purchaseList = ref(null)
const config = useRuntimeConfig()

try {
  const { data } = await axios.get(`${config.BACKEND_URL}/purchase/list/${route.params.id}`,useJwtToken())
  purchaseList.value = data
} catch (error) {
   router.push({name: 'index'})
   console.log(error);
}
  

</script>

<style>

</style>