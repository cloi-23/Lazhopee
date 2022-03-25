<template>
  <div>
      <h1>Driver</h1>
         <div  class="addLink">
             <nuxt-link :to="{name:'driver-add'}" >Add</nuxt-link>
         </div>

      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(driver,index) in driverList" :key="index">
                  <td>{{index+1}}</td>
                  <td><img :src='driver.photo' :alt="driver.name" width="100" height="100"> </td>
                  <td>{{driver.name}}</td>
                  <td>{{driver.contact}}</td>
                  <td>{{driver.address}}</td>
                   <td><i class="fa-solid fa-eye"></i><nuxt-link :to="{name: 'driver-id',params:{id : driver._id}}">View</nuxt-link></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia';
const router = useRouter()
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
let driverList = ref(null)

    let config = {
    headers: { 
      Authorization: `Bearer ${token.value}` 
      }
    }
    let res = await axios.get(`http://localhost:3000/driver`,config)
    if(res.status == 200) {
        driverList.value = res.data
    } else {
        console.log(res);
    }
</script>
