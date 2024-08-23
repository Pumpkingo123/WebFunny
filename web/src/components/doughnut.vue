<template>
    <div>
      <canvas ref="doughnutCanvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from 'chart.js'
  
  Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title)
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    colors:{
        type:Array,
        required: true
    }
  })
  
  const doughnutCanvas = ref<HTMLCanvasElement | null>(null)
  let chartInstance: Chart | null = null
  
  const createChart = () => {
    if (doughnutCanvas.value) {
      chartInstance = new Chart(doughnutCanvas.value, {
        type: 'doughnut',
        data: {
          labels: props.labels,
          datasets: [
            {
              label: '数据',
              backgroundColor: props.colors,
              data: props.data
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
          }
        }
      })
    }
  }
  
  onMounted(() => {
    createChart()
  })
  
  watch(() => props.data, () => {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = props.data
      chartInstance.update()
    }
  })
  
  watch(() => props.labels, () => {
    if (chartInstance) {
      chartInstance.data.labels = props.labels
      chartInstance.update()
    }
  })
  </script>
  
  <style scoped>
  /* 你可以在这里添加组件的样式 */
  </style>