<template>
<div>
    <h1>{{title}}</h1>
  <DoughnutChart :chartData="data" :options="options"   style="height:500px;"/>
  </div>
</template>

<script  setup>

   import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const props = defineProps({
    dataSet:Array,
    title:String
})

const data = computed(() => ({
      labels: props.dataSet.map(x=>x.prod),
      datasets: [
        {
          data: props.dataSet.map(x=>x.total),
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],

        },
      ],
    }))

  const options = ref({
plugins: {
         legend: {
                display: true,
                position:'bottom',
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        }
  
})

</script>