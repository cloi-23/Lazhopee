<template>
  <div>
   
      <h1>Purchase</h1>

      <nuxt-link :to="{name:'purchase-add'}">Add</nuxt-link>
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
                    <td><i class="fa-solid fa-eye"></i> <nuxt-link :to="{name: 'purchase-id',params:{id : purchase._id}}">View</nuxt-link></td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
const { data:purchaseList } =  await axios.get(`http://localhost:3000/purchase`)
</script>

<style>

</style>