<template>
 <div>
       
      <label for="search"> Store</label>  <select name="" id="" v-model="storeSelect" @change="storeSort" data-cy="store">
        <option selected>Select Store</option>
        <option v-for="(store,index) in storeList" :key="index" :value="store._id">{{store.name}}</option>
      </select><br>
      <label for="Date">
          Date
          <input type="date" v-model="dateOfPurchase">
      </label>
      <br>
     <label for="search"> Search Product</label> <input type="text" v-model="searchValue" @keydown="search" data-cy="search"/>
      <select-product :product="product" @message="messageData"/>
     

  
 </div>
</template>

<script setup>
import axios from 'axios'
const config = useRuntimeConfig()

const { data:storeList } =  await axios.get(`${config.BACKEND_URL}/store`,useJwtToken())
const { data:productList } =  await axios.get(`${config.BACKEND_URL}/product`,useJwtToken())
const searchValue = ref(null)
const product = ref(null)
const dateOfPurchase = ref(null)
const emit = defineEmits(['puchases'])
const storeSelect = ref(null)
const search = async()=>{
const { data:productList } =  await axios.get(`${config.BACKEND_URL}/product`,useJwtToken())


 const filterwdByStore = productList.filter((src) => src.storeId === storeSelect.value)
  

product.value = filterwdByStore.filter((src) => {
      const regex = /\s|[-]/g;
 
      const prod = src.name.toLowerCase().split(regex).join("");
      const searchProd = searchValue.value.toLowerCase().split(regex).join("");

      const category = src.category.toLowerCase().split(regex).join("");
      const store = src.storeId.toLowerCase().split(regex).join("");
  
      return prod.startsWith(searchProd) || category.startsWith(searchProd) 
      
    });

}
const storeSort =async()=>{
    const { data:productList } =  await axios.get(`${config.BACKEND_URL}/product`,useJwtToken())
product.value = productList.filter((src) => src.storeId === storeSelect.value)
}
const purchaseList = ref([])
const messageData = (val) =>{
      product.value=null
      searchValue.value = null
    purchaseList.value.push(val)
    emit('puchases', {articles:purchaseList.value,storeId:storeSelect.value ,dateOfPurchase:dateOfPurchase.value})
}

</script>

<style>

</style>