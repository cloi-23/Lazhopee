<template>
  <div>
      <h1>Customer</h1>
       <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                   <th>Contact</th>
                   <th>Username</th>
                  </tr>
          </thead>
          <tbody v-if="customerList">
            <tr v-for="(customer,index)  in customerList" :key="index">
                <td>{{index+1}} </td>
                 <td>{{customer.name}}</td>
                 <td>{{customer.address}}</td>
                  <td>{{customer.contact}}</td>
                   <td>{{customer.username}}</td>
                   
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
    const customerList = ref(null)
    let res = await axios.get(`http://localhost:3000/customer`,config)
    if(res.status == 200) {
        customerList.value = res.data
    } else {
        router.push({ name: 'index'})
        console.log(res);
    }
</script>
