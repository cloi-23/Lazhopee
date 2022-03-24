<template>
<div>
        <table v-if="incomeStatement">
         <!--Revenue-->
          <thead>
              <tr>
                  <th colspan="2" style="text-align:left">Revenue</th>
                 
                  </tr>
          </thead>
          <tbody>
         <tr>
         <th> Total Sales</th>
          <td rowspan="2"> 
          
            <currency-formatter :amount="incomeStatement.totalOrder" withSymbol/>
            <span style="margin-left:-150px">-</span>
         <currency-formatter :amount="incomeStatement.totalPurchase" withSymbol/></td>
          </tr>
             <tr>
         <th>  Total Purchase</th>
      
          </tr>
          </tbody>
           <tr>
                  <th  style="text-align:left">Total Revenue:</th>
                 <th  style="text-align:center" v-if="incomeStatement.order.length !=0"><currency-formatter :amount="revenue(incomeStatement.totalOrder,incomeStatement.totalPurchase)" withSymbol/></th>
                  <th  style="text-align:center" v-else>0</th>
                  </tr>
         <!--Revenue-->

            <!--Expense-->
          <thead>
              <tr>
                  <th colspan="2" style="text-align:left">Expense</th>
                 
                  </tr>
          </thead>
          <tbody>
         <tr>
         <th> Total Expense</th>
          <td rowspan="2"> 
          
            <currency-formatter :amount="0" />
           </td>
          </tr>
         <!--Expense-->
          </tbody>
           <tr>
                  <th  style="text-align:left">Net Income:</th>
                 <th  style="text-align:center" v-if="incomeStatement.order.length !=0"><currency-formatter :amount="netIncome" withSymbol/></th>
                  <th  style="text-align:center" v-else>0</th>
                  </tr>
      </table>
      </div>
</template>

<script setup>
defineProps({
    incomeStatement:Array
})
const rev = ref(0)
const expense = ref(0)
const revenue = (order,purchase)=>{
    rev.value=order - purchase
return order - purchase
}
const netIncome = computed(()=>rev.value - expense.value)
</script>

<style scoped>
table th,td{
border: 2px solid #333;
}
table{
    margin-bottom: 50px;

  
}

</style>