<template>
  <div>
      <h1>Add Purchase</h1>
        <div class="addLink"> 
        <nuxt-link :to="{name : 'purchase'}" >  Back</nuxt-link>
    </div>
      <div class="sub-title">
        <select-store @puchases="list"/>
      </div>
      <div v-if="purchaseList">
         <list-purchase :purchaseList="purchaseList"/>
         <button @click="save(purchaseList)" class="btn btn-primary" data-cy="add">Save</button>
      </div>
  
   
  </div>
</template>

<script setup>
import axios from 'axios'
const searchValue = ref(null)
const product = ref(null)
const purchaseList = ref(null)
const router = useRouter()
const list  = (list)=>{
purchaseList.value = list
}
const save = async (listOfPurchase) =>{
  try {
    const purchaseTotal =  listOfPurchase.articles.map(article => {
    return article.quantity[article.index] * article.unitCost[article.index] }).reduce((x,y) => x + y)
    const purchase = {
      storeId: listOfPurchase.storeId,
      dateOfPurchase:listOfPurchase.dateOfPurchase,
      totalAmount:purchaseTotal,
      articles:listOfPurchase.articles.map(article =>{
        return {
          productId: article._id,
          quantity: article.quantity[article.index],
          unitCost: article.unitCost[article.index]
        }
      })
    }
     console.log(purchase);
    const res = await axios.post(`http://localhost:3000/purchase/add`, purchase, useJwtToken())
    console.log(res.status);
router.push({name:'purchase'})
  } catch (error) {
    console.log(error);
  }
}

</script>

<style>

</style>