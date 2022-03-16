<template>
  <span>
      {{date}}
  </span>
</template>

<script setup>
import { format, compareAsc } from 'date-fns'

const props = defineProps({
    timestamp:String
})
 const date = computed(()=> format(new Date(props.timestamp),'MM/dd/yyyy'))

</script>

<style>

</style>