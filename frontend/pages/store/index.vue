<template>
  <div>
       <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
      <h1>Store</h1>
      <nuxt-link :to="{name : 'store-add'}"> Add</nuxt-link>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                   <th>Address</th>
                   <th>Contact</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(store,index)  in storeList" :key="index">
                <td>{{index+1}}</td>
                 <td><img :src='store.image' :alt="store.name" width="100" height="50"> </td>
                 <td>{{store.name}}</td>
                  <td>{{store.address}}</td>
                   <td>{{store.contact}}</td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
const { data:storeList } =  await axios.get(`http://localhost:3000/store`)
</script>

<style>

</style>