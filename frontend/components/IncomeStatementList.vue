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
         <th> Total Revenue</th>
          <td rowspan="2"> 
          
            <currency-formatter :amount="incomeStatement.totalOrder" withSymbol/>
            <span style="margin-left:-150px">-</span>
         <currency-formatter :amount="incomeStatement.costOfGoods" withSymbol/></td>
          </tr>
             <tr>
         <th>  Cost of Goods</th>
      
          </tr>
          </tbody>
           <tr>
                  <th  style="text-align:left">Total Revenue:</th>
                 <th  style="text-align:center" v-if="incomeStatement.order.length !=0"><currency-formatter :amount="revenue" withSymbol /></th>
                  <th  style="text-align:center" v-else data-cy="TRzero">0</th>
                  </tr>
                  <span data-cy="totalRev" v-show="false">{{revenue}}</span>
         <!--Revenue-->

            <!--Expense-->
          <thead>
              <tr>
                  <th colspan="2" style="text-align:left">Expense</th>
                 
                  </tr>
          </thead>
          <tbody>
              <tbody>
                  <tr v-for="(expense,index) in incomeStatement.expenseList" :key="index">
                      <td>{{expense.name}}</td>
                      
                  </tr>
              </tbody>
         <tr>
         <th> Total Expense</th>
          <td rowspan="2"> 
            <currency-formatter :amount="incomeStatement.totalExpense" />
           </td>
          </tr>
            <span data-cy="totalExp" v-show="false">{{incomeStatement.totalExpense}}</span>
            <span data-cy="netShould" v-show="false">{{ revenue - incomeStatement.totalExpense }}</span>
         <!--Expense-->
          </tbody>
           <tr>
                  <th  style="text-align:left">Net Income:</th>
                 <th  style="text-align:center" ><currency-formatter :amount="netIncome" withSymbol data-cy="NIvalue"/></th>
                  </tr>
      </table>
                  <span data-cy="net" v-show="false">{{netIncome}}</span>

      </div>
</template>

<script setup>
const props = defineProps({
    incomeStatement:Array
})

const revenue = computed(()=>props.incomeStatement.totalOrder  - props.incomeStatement.costOfGoods)
const netIncome = computed(()=>revenue.value - props.incomeStatement.totalExpense)
</script>

<style scoped>
table th,td{
border: 2px solid #333;
}
table{
    margin-bottom: 50px;

  
}

</style>