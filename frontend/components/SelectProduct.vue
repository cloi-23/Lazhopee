<template>
  <div>
       <table  v-if="product">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Store</th>
                      <th>Quantity</th>
                    <th>UnitCost</th>
                    <th>Total</th>
                    <th>Action</th>
              </tr>
          </thead>
        
          <tbody>
            <tr v-for="(prod,index)  in product" :key="index">
            
                <td>{{index+1}}</td>
                 <td><img :src='prod.image' :alt="prod.name" width="100" height="100"></td>
                  <td>{{prod.name}}</td>
                   <td>{{prod.category}}</td>
                    <td>{{prod.store}}</td>
                    
                      <td><input type="number" v-model="quantity[index]"/> </td>
                        <td><input type="number" v-model="unitCost[index]"/> </td>
                        <td>{{quantity[index] * unitCost[index]||0}} </td>

               
                    <td><button @click="add(prod,index)">Select</button></td>
            </tr>
          </tbody>
      </table>
      </div>
    
</template>

<script setup>

defineProps({
    product:Object
})
const quantity = ref([])
const unitCost = ref([])

const emit = defineEmits(['message'])
const add = (product,index) => {
     const prod = {
        name: product.name,
        category:product.category,
        store:product.store,
        _id : product._id,
        image :  product.image,
        quantity: quantity.value,
        unitCost: unitCost.value,
        total: quantity.value * unitCost.value,
        index
    }
    console.log(quantity.value,index);
     quantity.value = []
     unitCost.value = []
     
emit('message',prod)
}
</script>

<style>

</style>