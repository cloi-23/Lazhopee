<template>
    <div class="sidebar">
      <h2>Lazhopee</h2>
      <ul class="nav">
          <li>
              <nuxt-link :to="{name:'dashboard'}">
                  <i class='bx bxs-dashboard bx-sm'></i>
                  <span>Dashboard</span> 
             </nuxt-link>
          </li>
             <li>
                 <nuxt-link :to="{name:'store'}">
                  <i class='bx bxs-store bx-sm'></i>
                  <span>Store</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'product'}">
                  <i class='bx bxs-package bx-sm'></i>
                  <span>Product</span> 
              </nuxt-link>
          </li>
             <li>
             <nuxt-link :to="{name:'purchase'}">
                  <i class='bx bxs-cart-add bx-sm'></i>
                  <span>Purchase</span> 
                   </nuxt-link>
          </li>
             <li>
              <nuxt-link :to="{name:'product'}">
                  <i class='bx bxs-user bx-sm'></i>
                  <span>Customer</span> 
                   </nuxt-link>
          </li>
      </ul>
  </div>
</template>

<script>

</script>

<style>

</style>