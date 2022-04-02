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
const router = useRouter()

const send = async()=>{
  try {
    const { data } =  await axios.get(`http://localhost:3000/sale/daily/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
    sales.value =data.sale
  } catch (error) {
    router.push({name:'index'})
  }

}
const day = async ()=>{
  try {
const { data } =  await axios.get(`http://localhost:3000/sale/daily/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
     daySale.value =data.sale
     dayToggle.value= true
     monthToggle.value= false
     yearToggle.value=false
  } catch (error) {
    router.push({name:'index'})
  }
}
const month =async ()=>{
  try {
    const { data } =  await axios.get(`http://localhost:3000/sale/monthly/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
    monthSale.value=data
    dayToggle.value= false
    yearToggle.value=  false
    monthToggle.value=true
  } catch (error) {
     router.push({name:'index'})
  }

  
}
const year =async ()=>{
  try {
    const { data } =  await axios.get(`http://localhost:3000/sale/yearly/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
     yearSale.value=data
     dayToggle.value= false
     monthToggle.value= false
     yearToggle.value=true
  } catch (error) {
    router.push({name:'index'})
  }

  
}
const save = async()=>{
  try {
    const { data } =  await axios.get(`http://localhost:3000/sale/product/?startDate=${pieStartDate.value}/&endDate=${pieEndDate.value}`,useJwtToken())
    productSale.value =data
  } catch (error) {
     router.push({name:'index'})
  }

}
await save()
await send()
</script>

<style scoped>
</style>