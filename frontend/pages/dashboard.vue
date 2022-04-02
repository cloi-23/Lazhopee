<template>
<div>
      <span data-cy="daily" v-show="false">{{daySaleTotal}}</span><br>
      <span data-cy="monthly" v-show="false">{{monthSaleTotal}}</span><br>
      <span data-cy="yearly" v-show="false">{{yearSaleTotal}}</span>

<h1>DashBoard</h1>
   <div class="incomeForm">
           <form @submit.prevent="send" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="startDate" data-cy="startDate"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="endDate" data-cy="endDate"/>
              <button @click="day" data-cy="perDay">Per Day</button>
              <button @click="month" data-cy="perMonth">Per Month</button>
              <button @click="year" data-cy="perYear">Per Year</button>
        </div>
      </form>
    </div>
    <div class="chart">
    <div v-if="dayToggle && monthToggle==false  && yearToggle==false">
      <line-chart-template :dataSet="sales" title="Daily Sales" />
    </div>
  
      <div v-else-if="monthToggle && yearToggle==false">
      <line-chart-template :dataSet="monthSale" title="Monthly Sales" />
    </div>
        <div v-else-if="yearToggle && monthToggle==false">
      <line-chart-template :dataSet="yearSale" title="Yearly Sales" />
    </div>
    </div>

 <div class="incomeForm">
           <form @submit.prevent="save" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="pieStartDate" data-cy="start"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="pieEndDate" data-cy="end"/>
              <button data-cy="send">Send</button>
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
const monthSaleTotal = ref(null)
const yearSale = ref(null)
const yearSaleTotal = ref(null)
const daySale = ref(null)
const daySaleTotal = ref(null)
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
const { data } =  await axios.get(`http://localhost:3000/sale/daily/${startDate.value}/${endDate.value}`,useJwtToken())
daySale.value =data.sale
      dayToggle.value= true
   monthToggle.value= false
  yearToggle.value=false
  daySaleTotal.value = data.sale.map(x => x.total).reduce((x,y) => x+y,0)
}
const month =async ()=>{
const { data } =  await axios.get(`http://localhost:3000/sale/monthly/${startDate.value}/${endDate.value}`,useJwtToken())
   monthSale.value=data
   dayToggle.value= false
  yearToggle.value=  false
  monthToggle.value=true
}
  
const year =async ()=>{
  try {
    const { data } =  await axios.get(`http://localhost:3000/sale/yearly/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
     yearSale.value=data
     dayToggle.value= false
     monthToggle.value= false
     yearToggle.value=true
    yearSaleTotal.value = data.map(x => x.total).reduce((x,y) => x+y,0)
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