<template>
<div>

<h1>DashBoard</h1>
   <div class="incomeForm">
           <form @submit.prevent="send" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="startDate"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="endDate"/>
              <button @click="day">Per Day</button>
              <button @click="month">Per Month</button>
              <button @click="year">Per Year</button>
        </div>
      </form>
    </div>
    <div class="chart">
    <div v-if="dayToggle && monthToggle==false  && yearToggle==false">
      <line-chart-template :dataSet="sales" title="Daily Sales"/>
    </div>
  
      <div v-else-if="monthToggle && yearToggle==false">
      <line-chart-template :dataSet="monthSale" title="Monthly Sales"/>
    </div>
        <div v-else-if="yearToggle && monthToggle==false">
      <line-chart-template :dataSet="yearSale" title="Yearly Sales"/>
    </div>
    </div>

 <div class="incomeForm">
           <form @submit.prevent="save" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="pieStartDate"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="pieEndDate"/>
              <button >Send</button>
        </div>
      </form>
      </div>

      <pie-chart :dataSet="productSale" title="Product Per Sale"/>
</div> 
</template>
<script  setup>
import axios from 'axios'
const startDate = ref('2022-01-01')
const endDate = ref('2022-12-31')
const pieStartDate = ref('2022-03-01')
const pieEndDate = ref('2022-03-31')
const sales = ref(null)
const dayToggle=ref(true)
const monthToggle=ref(false)
const yearToggle=ref(false)
const monthSale = ref(null)
const yearSale = ref(null)
const daySale = ref(null)
const productSale = ref(null)
const send = async()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/daily/${startDate.value}/${endDate.value}`)
sales.value =data.sale
}
const day = async ()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/daily/${startDate.value}/${endDate.value}`)
daySale.value =data.sale
      dayToggle.value= true
   monthToggle.value= false
  yearToggle.value=false
}
const month =async ()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/monthly/${startDate.value}/${endDate.value}`)
   monthSale.value=data
   dayToggle.value= false
  yearToggle.value=  false
  monthToggle.value=! monthToggle.value
  
}
const year =async ()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/yearly/${startDate.value}/${endDate.value}`)
   yearSale.value=data
    dayToggle.value= false
   monthToggle.value= false
  yearToggle.value=! yearToggle.value
  
}
const save = async()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/product/${pieStartDate.value}/${pieEndDate.value}`)
productSale.value =data
}
await save()
await send()
</script>

<style scoped>
</style>