<template>
  <div>
      <h1>Income Statement</h1>
      <div class="incomeForm">
           <form @submit.prevent="send" >
         <div>
              <label for="startDate"> Start Date </label>
              <input type ="date"  v-model="startDate" data-cy="startDate"/>
               <label for="startDate"> End Date </label>
              <input type ="date"  v-model="endDate" data-cy="endDate"/>
              <button data-cy="send">Send</button>
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
const startDate = ref('2022-03-01')
const endDate = ref('2022-03-31')
const router = useRouter()
const incomeStatement = ref(null)

const send = async()=>{
  try {
  const { data } =  await axios.get(`http://localhost:3000/incomeStatement/?startDate=${startDate.value}&endDate=${endDate.value}`,useJwtToken())
  incomeStatement.value = data
} catch (error) {
   router.push({ name: 'index'})
   console.log(error);
}

}
await send()

</script>

<style scoped>
table th,td{
border: 2px solid #333;
}


</style>