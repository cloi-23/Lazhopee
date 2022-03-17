<template>
  <div>
      <h1>Driver</h1>
<nuxt-link :to="{name:'driver-add'}">Add</nuxt-link>
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
                   <td><nuxt-link :to="{name: 'driver-id',params:{id : driver._id}}">View</nuxt-link></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios';

const { data:driverList} = await axios.get(`http://localhost:3000/driver`)
</script>

<style>

</style>