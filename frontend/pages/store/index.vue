<template>
  <div>
      <h1>Store</h1>
      <div  class="addLink">
         <nuxt-link :to="{name : 'store-add'}" > Add</nuxt-link>
      </div>
     
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
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia';

const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
    let config = {
    headers: { 
      Authorization: `Bearer ${token.value}` 
      }
    }
const storeList = ref(null)
  let res = await axios.get(`http://localhost:3000/store`,config)
  if(res.status == 200) {
      storeList.value = res.data
  } else {
      console.log(res);
  }
</script>

<style>

</style>