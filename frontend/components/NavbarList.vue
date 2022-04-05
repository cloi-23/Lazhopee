<template>
    <div class="sidebar">
        
      <h2>Lazhopee</h2>
      <ul class="nav">
          <li v-show="false">
              <nuxt-link :to="{name:'test-order'}" data-cy="test">
                  <i class='bx bxs-dashboard bx-sm'></i>
                  <span class="label" >test-order</span> 
             </nuxt-link>
          </li>
          <li>
              <nuxt-link :to="{name:'dashboard'}" data-cy="dashboard">
                  <i class='bx bxs-dashboard bx-sm'></i>
                  <span class="label" >Dashboard</span> 
             </nuxt-link>
          </li>
             <li>
                 <nuxt-link :to="{name:'store'}" data-cy="sidebar-store">
                  <i class='bx bxs-store bx-sm'></i>
                  <span class="label">Store</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'product'}" data-cy="sidebar-product">
                  <i class='bx bxs-package bx-sm'></i>
                  <span class="label">Product</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'purchase'}" data-cy="sidebar-purchase">
                  <i class='bx bxs-cart-add bx-sm'></i>
                  <span class="label">Purchase</span> 
                   </nuxt-link>
          </li>
             <li>
              <nuxt-link :to="{name:'customer'}" data-cy="sidebar-customer">
                  <i class='bx bxs-user bx-sm'></i>
                  <span class="label">Customer</span> 
                   </nuxt-link>
          </li>
                <li>
                    <i class="fa-solid fa-motorcycle fa-lg" style="color:#fff; margin-left: 40px"></i>

              <nuxt-link :to="{name:'driver'}" data-cy="sidebar-driver">
                  <span class="label"  style="margin-left: -20px">Driver</span> 
                   </nuxt-link>
          </li>
            <li>
                    <nuxt-link :to="{name:'expense'}" data-cy="sidebar-expense">
                        <i class='bx bxs-dollar-circle bx-sm'></i>
                        <span class="label">Expenses</span> 
                   </nuxt-link>
                 </li>
                 <li>
                    <nuxt-link :to="{name:'incomeStatement'}" data-cy="sidebar-incomeStatement">
                        <i class='bx bxs-bar-chart-alt-2 bx-sm'></i>
                        <span class="label"  >Income Statement</span> 
                   </nuxt-link>
                 </li>
      
      
                <li @click="IsToggle = !IsToggle">
                    <i class="fa-solid fa-truck fa-lg" style="color:#fff; margin-left: 40px"></i>

             
             <p>
                  <span class="label"  data-cy="sidebar-shipment">Shipment   <i class="fa-solid fa-sort-down" style="color:#fff; margin-left: 30px; "></i></span>
                 </p>
                
          </li>
           <span v-show="IsToggle" class="dropDownMenu">
                     <li>
                         <i class='bx bxs-package bx-sm' style="color:#fff; margin-left: 30px; "></i>
                        <nuxt-link :to="{name:'shipment-pending'}" data-cy="sidebar-pending">
                
                        <span class="label"  style="margin-left: -20px">Pending</span> 
                        </nuxt-link>
                    </li>
                       <li>
                         <i class="fa-solid fa-truck-field fa-lg" style="color:#fff; margin-left: 30px"></i>
                        <nuxt-link :to="{name:'shipment-shipping'}" data-cy="sidebar-shipping">
                
                        <span class="label"  style="margin-left: -20px">Shipping</span> 
                        </nuxt-link>
                    </li>
                       <li> 
                         <i class="fa-solid fa-truck-ramp-box fa-lg" style="color:#fff; margin-left: 30px"></i>
                        <nuxt-link :to="{name:'shipment-delivered'}" data-cy="sidebar-delivered">
                
                        <span class="label"  style="margin-left: -20px"> Delivered</span> 
                        </nuxt-link>
                    </li>
                 </span>
            <li>
              <nuxt-link @click="logout" :to="{name:'index'}" data-cy="logout">
                  <i class='bx bxs-dashboard bx-sm'></i>
                  <span class="label" >Logout</span> 
             </nuxt-link>
          </li>
      </ul>
  </div>
</template>

<script setup>
const IsToggle = ref(false)
const logout = () => {
    localStorage.clear('token')
}
</script>

<style>

</style>