<template>
<div>
  Dashboard
  <button @click="$router.push({ name: 'shipment' })">Orders</button>
 <div>Chart</div>
<h2>Sales Table</h2>

<table>
  <tr>
    <th>Date</th>
    <th>Customer</th>
    <th>Total</th>
  </tr>
</table>
</div>
</template>
<script lang="ts" setup>
import '~/assets/css/table.css'
</script>
