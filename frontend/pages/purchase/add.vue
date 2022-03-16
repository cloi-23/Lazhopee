<template>
  <div>
         <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
      <h1>Add Purchase</h1>
      <div>  
        <select-store @puchases="list"/>
      </div>
      <div v-if="purchaseList">
         <list-purchase :purchaseList="purchaseList"/>
         <button @click="save(purchaseList)">Save</button>
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
    const res = await axios.post(`http://localhost:3000/purchase/add`,purchase)
    console.log(res.status);
router.push({name:'purchase'})
  } catch (error) {
    console.log(error);
  }
}

</script>

<style>

</style>