<template>
  <div>
      
      <h1>Product</h1>
      <nuxt-link :to="{name : 'product-add'}"> Add</nuxt-link>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                   <th>Store</th>
                   <th>Selling Price</th>
                    <th>Action</th>
              </tr>
          </thead>
          <tbody v-if="productList">
            <tr v-for="(product,index)  in productList" :key="index">
                <td>{{index+1}}</td>
                 <td><img :src='product.image' :alt="product.name" width="100" height="100"> </td>
                 <td>{{product.name}}</td>
                 <td>{{product.category}}</td>
                  <td>{{product.store}}</td>
                   <td>{{product.sellingPrice}}</td>
                    <td><nuxt-link :to="{name: 'product-id',params:{id : product._id}}">View</nuxt-link></td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
const { data:productList } =  await axios.get(`http://localhost:3000/product`)




</script>

<style>

</style>