<template>
  <div>
   
      <h1>Purchase</h1>
      <div  class="addLink">
              <nuxt-link :to="{name:'purchase-add'}">Add</nuxt-link>
      </div>

        <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Store</th>
                  <th>Date</th>
              
                    <th>Action</th>
              </tr>
          </thead>
          <tbody v-if="purchaseList">
            <tr v-for="(purchase,index)  in purchaseList" :key="index">
                <td>{{index+1}}</td>
                <td>{{purchase.store}}</td>
                 <td><date-formatter :timestamp="purchase.dateOfPurchase"/></td>
                    <td><i class="fa-solid fa-eye"></i> <nuxt-link :to="{name: 'purchase-id',params:{id : purchase._id}}" data-cy="view">View</nuxt-link></td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia';
const router = useRouter()
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
let purchaseList = ref(null)
  let config = {
  headers: { 
    Authorization: `Bearer ${token.value}` 
    }
  }
  let res = await axios.get(`http://localhost:3000/purchase`,config)
  if(res.status == 200) {
      purchaseList.value = res.data
  } else {
      console.log(res);
  }
</script>
