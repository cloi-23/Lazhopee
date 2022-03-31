<template>
<div>
  <LineChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</div>

</template>

<script setup>
import { ref, computed, defineProps } from "vue"
import { LineChart } from "vue-chart-3"
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js"
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)
const props = defineProps({
  dataSet:Array
})
const dataValues = ref(props.dataSet.map(x=>x.total))
const data = computed(() => ({
  labels: props.dataSet.map(x=>x.date),
  datasets: [
    {
      label: "Sale",
      data: dataValues.value,
      backgroundColor: "#dc322f"
    }
  ]
}))
const options = ref({
  plugins: {
    title: {
      text: "Line"
    }
  }
})
</script>