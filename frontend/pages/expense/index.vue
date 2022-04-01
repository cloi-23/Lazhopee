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
const router = useRouter()
const expenseList = ref(null)
try {
  const { data } =  await axios.get(`http://localhost:3000/expense`,useJwtToken())
  expenseList.value = data
} catch (error) {
     router.push({ name: 'index'})
     console.log(error);
}

</script>

<style>

</style>