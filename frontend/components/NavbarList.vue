<template>
    <div class="sidebar">
        
      <h2>Lazhopee</h2>
      <ul class="nav">
          <li>
              <nuxt-link :to="{name:'dashboard'}">
                  <i class='bx bxs-dashboard bx-sm'></i>
                  <span class="label">Dashboard</span> 
             </nuxt-link>
          </li>
             <li>
                 <nuxt-link :to="{name:'store'}">
                  <i class='bx bxs-store bx-sm'></i>
                  <span class="label">Store</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'product'}">
                  <i class='bx bxs-package bx-sm'></i>
                  <span class="label">Product</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'purchase'}">
                  <i class='bx bxs-cart-add bx-sm'></i>
                  <span class="label">Purchase</span> 
                   </nuxt-link>
          </li>
             <li>
              <nuxt-link :to="{name:'customer'}">
                  <i class='bx bxs-user bx-sm'></i>
                  <span class="label">Customer</span> 
                   </nuxt-link>
          </li>
                <li>
                    <i class="fa-solid fa-motorcycle fa-lg" style="color:#fff; margin-left: 40px"></i>

              <nuxt-link :to="{name:'driver'}">
                  <span class="label"  style="margin-left: -20px">Driver</span> 
                   </nuxt-link>
          </li>
                 <li>
                    <nuxt-link :to="{name:'incomeStatement'}">
                        <i class='bx bxs-bar-chart-alt-2 bx-sm'></i>
                        <span class="label"  >Income Statement</span> 
                   </nuxt-link>
                 </li>
      
      
                <li @click="IsToggle = !IsToggle">
                    <i class="fa-solid fa-truck fa-lg" style="color:#fff; margin-left: 40px"></i>

             
             <p>
                  <span class="label"  >Shipment   <i class="fa-solid fa-sort-down" style="color:#fff; margin-left: 30px; "></i></span>
                 </p>
                
          </li>
           <span v-show="IsToggle" class="dropDownMenu">
                     <li>
                         <i class='bx bxs-package bx-sm' style="color:#fff; margin-left: 30px; "></i>
                        <nuxt-link :to="{name:'shipment-pending'}">
                
                        <span class="label"  style="margin-left: -20px">Pending</span> 
                        </nuxt-link>
                    </li>
                       <li>
                         <i class="fa-solid fa-truck-field fa-lg" style="color:#fff; margin-left: 30px"></i>
                        <nuxt-link :to="{name:'shipment-shipping'}">
                
                        <span class="label"  style="margin-left: -20px">Shipping</span> 
                        </nuxt-link>
                    </li>
                       <li> 
                         <i class="fa-solid fa-truck-ramp-box fa-lg" style="color:#fff; margin-left: 30px"></i>
                        <nuxt-link :to="{name:'shipment-delivered'}">
                
                        <span class="label"  style="margin-left: -20px"> Delivered</span> 
                        </nuxt-link>
                    </li>
                 </span>
      </ul>
  </div>
</template>

<script setup>
const IsToggle = ref(false)

</script>

<style>

</style>