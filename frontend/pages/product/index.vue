<template>
  <div>
      
      <h1>Product</h1>
            <div  class="addLink">
               <nuxt-link :to="{name : 'product-add'}" data-cy="add"> Add</nuxt-link>
            </div>
     
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                   <th>Store</th>
                   <th>Selling Price</th>
                    <th>Action</th>
              </tr>
          </thead>
          <tbody v-if="productList">
            <tr v-for="(product,index)  in productList" :key="index">
                <td>{{index+1}}</td>
                 <td><img :src='product.image' :alt="product.name" width="100" height="100"> </td>
                 <td>{{product.name}}</td>
                 <td>{{product.category}}</td>
                  <td>{{product.store}}</td>
                   <td> <currency-formatter :amount="product.sellingPrice"/></td>
                    <td><i class="fa-solid fa-eye"></i><nuxt-link :to="{name: 'product-id',params:{id : product._id}}" data-cy="view">View</nuxt-link></td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from 'axios'
const router = useRouter()
const productList = ref(null)
try {
    const {data} = await axios.get(`http://localhost:3000/product`,useJwtToken())
    productList.value =data
} catch (error) {
  router.push({ name: 'index'})
  console.log(error);
}


</script>