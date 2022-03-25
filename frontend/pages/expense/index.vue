<template>
  <div>
   
      <h1>Expense</h1>
      <div  class="addLink">
              <nuxt-link :to="{name:'expense-add'}">Add</nuxt-link>
      </div>

        <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Cost</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody v-if="expenseList">
            <tr v-for="(expense,index)  in expenseList" :key="index">
                <td>{{index+1}}</td>
                <td>{{expense.name}}</td>
                  <td> <currency-formatter :amount="expense.cost" /></td>
                 <td><date-formatter :timestamp="expense.date"/></td>
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
const { data:expenseList } =  await axios.get(`http://localhost:3000/expense`,config)
</script>

<style>

</style>