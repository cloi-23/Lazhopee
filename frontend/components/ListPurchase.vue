<template>
  <div>
      <table >
          <thead>
              <tr>
                     <th>#</th>
                     <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>UnitCost</th>
                    <th>Total</th>
                    
              </tr>
          </thead>
          <tbody>
              <tr v-for="(purchase,index) in purchaseList.articles" :key="index">
                  <td>{{index+1}}</td>
                   <td><img :src='purchase.image' :alt="purchase.name" width="100" height="100"></td>
                    <td>{{purchase.name}}</td>
                     <td>{{purchase.category}}</td>
                        <td>{{purchase.quantity[purchase.index] || purchase.quantity}}</td>
                        <td>{{purchase.unitCost[purchase.index] || purchase.unitCost }}</td>
                        <td>{{total(purchase.quantity[purchase.index] ,purchase.unitCost[purchase.index]) || purchase.quantity * purchase.unitCost}} </td>
                     

              </tr>
              <tr >
                  <td colspan="6" style="text-align:right">Total Amount:</td>
                 <td> <span style="color:#ffbf00; font-weight:bold "> {{purchaseList.totalAmount || totalAmount(purchaseList.articles)}}</span></td>
              
                  
              </tr>
          </tbody>
          </table>
  </div>
</template>

<script setup>
const props = defineProps({
    purchaseList:Array
})
const isToggle = ref(true)
const total = (quantity,unitCost) => {
return quantity * unitCost
}

const totalAmount = (puchase)=>{
const purchaseTotal =  puchase.map(article => {
    return article.quantity[article.index] * article.unitCost[article.index] })
return purchaseTotal.reduce((x,y) => x + y)
}

</script>

<style>

</style>