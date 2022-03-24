<template>
  <div>
      <h1>Income Statement</h1>
      <div class="incomeForm">
           <form @submit.prevent="send" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="startDate"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="endDate"/>
              <button>Send</button>
        </div>
        
      </form>
      </div>
      <span  v-if="incomeStatement">
  <pre>Order{{incomeStatement.order}}</pre> 
     <pre>Purchase{{incomeStatement.purchase}}</pre> 
     </span>
      <!-- <span  v-if="incomeStatement">
        <income-statement-list :incomeStatement="incomeStatement"/>
      </span>
            <span  v-else>

      </span> -->
 
  </div>
</template>

<script setup>
import axios from 'axios'

const startDate = ref('2022-02-02')
const endDate = ref('2022-03-01')
const incomeStatement = ref(null)
const send = async()=>{
const { data } =  await axios.get(`http://localhost:3000/incomeStatement/${startDate.value}/${endDate.value}`)
incomeStatement.value = data
// startDate.value=null
// endDate.value=null
// await send()
}

</script>

<style scoped>
table th,td{
border: 2px solid #333;
}


</style>