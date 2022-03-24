<template>
<div>
    <br>
   from component ... {{incomeStatement}}
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
          
            <currency-formatter :amount="total(incomeStatement.order)" withSymbol/>
            <span style="margin-left:-150px">-</span>
         <currency-formatter :amount="total(incomeStatement.purchase)" withSymbol/></td>
          </tr>
             <tr>
         <th>  Total Purchase</th>
      
          </tr>
          </tbody>
           <tr>
                  <th  style="text-align:left">Total Revenue:</th>
                 <th  style="text-align:center" v-if="incomeStatement.order.length !=0"><currency-formatter :amount="revenue(incomeStatement)" withSymbol/></th>
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
                  <th  style="text-align:left">Net Revenue:</th>
                 <th  style="text-align:center" v-if="incomeStatement.order.length !=0"><currency-formatter :amount="revenue(incomeStatement)" withSymbol/></th>
                  <th  style="text-align:center" v-else>0</th>
                  </tr>
        

      </table>
      </div>
</template>

<script setup>
defineProps({
    incomeStatement:Array
})
const total = (list)=>{
  return list.map(x=>x.total).reduce((x,y)=>x+y)
}
const revenue = (list)=>{
    const order = list.order.map(x=>x.total).reduce((x,y)=>x+y)
    const purchase = list.purchase.map(x=>x.total).reduce((x,y)=>x+y)
return order - purchase
}

</script>

<style scoped>
table th,td{
border: 2px solid #333;
}
table{
    margin-bottom: 50px;

  
}

</style>