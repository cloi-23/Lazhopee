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
        <income-statement-list :incomeStatement="incomeStatement"/>
      </span>
            <span  v-else>

      </span>
 
  </div>
</template>

<script setup>
import axios from 'axios'
import { tokenJWT } from '../../store/token'
import { storeToRefs } from 'pinia';
const myToken = tokenJWT()
const { token } = storeToRefs(myToken)
const startDate = ref('2022-03-01')
const endDate = ref('2022-03-31')
const incomeStatement = ref(null)
  let config = {
  headers: { 
    Authorization: `Bearer ${token.value}` 
    }
  }
const send = async()=>{
const { data } =  await axios.get(`http://localhost:3000/incomeStatement/${startDate.value}/${endDate.value}`,config)
incomeStatement.value = data

}
await send()

</script>

<style scoped>
table th,td{
border: 2px solid #333;
}


</style>