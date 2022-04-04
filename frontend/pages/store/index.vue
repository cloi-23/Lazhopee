<template>
  <div>
      <h1>Store</h1>
      <div  class="addLink">
         <nuxt-link :to="{name : 'store-add'}" data-cy='add'> Add</nuxt-link>
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
const router  = useRouter()
const storeList = ref(null)
const config = useRuntimeConfig()

try {
   const { data } = await axios.get(`${config.BACKEND_URL}/store`,useJwtToken())
  storeList.value = data 
} catch (error) {
  router.push({name: 'index'})
  console.log(error);
}
 

</script>

<style>

</style>