<template>
  <div style="height: 100%; width: 100%; background-color: white">
    <canvas id="myChart" style="height: 100%; width: 100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'

interface Dataset {
  type: 'bar' | 'line'
  label: string
  borderColor: string
  backgroundColor: string
  data: number[]
  borderDash: number[]
  yAxisID: string
}

// Props
const props = defineProps({
  labels: Array,
  onErrorData: {
    type: Array,
    default: () => []
  },
  consoleErrorData: {
    type: Array,
    default: () => []
  },
  onErrorPerData: {
    type: Array,
    default: () => []
  },
  consoleErrorPerData: {
    type: Array,
    default: () => []
  },
  range: Array,
  fetchDataPromise: Promise,
  chartColors: {
    type: Object,
    default: () => ({
      onErrorPerColor: '#2cdd96',
      consoleErrorPerColor: '#ff8639',
      onErrorColor: '#58aefc',
      consoleErrorColor: '#9596fc'
    })
  },
  chartLabels: {
    type: Object,
    default: () => ({
      onErrorPerLabel: 'jsError',
      consoleErrorPerLabel: 'consoleError',
      onErrorLabel: 'onErrorPer',
      consoleErrorLabel: 'consoleErrorPer'
    })
  },
  chartType: {
    type: String,
    default: 'bar'
  }
})

// Chart instance
let myChart: Chart<'bar' | 'line', unknown[] | undefined, unknown> | null = null

const fetch = async () => {
  if (myChart) {
    myChart.data.labels = props.labels as string[]
    myChart.data.datasets[0].data = props.onErrorPerData as any[]
    myChart.data.datasets[1].data = props.consoleErrorPerData as any[]
    myChart.data.datasets[2].data = props.onErrorData as any[]
    myChart.data.datasets[3].data = props.consoleErrorData as any[]
    myChart.update()
  }
}

watch(
  () => props.range,
  async (newRange) => {
    await nextTick()
    if (props.fetchDataPromise) {
      await props.fetchDataPromise
    } else {
      console.error('fetchDataPromise is undefined')
    }
    fetch()
  }
)

onMounted(async () => {
  await nextTick()
  if (props.fetchDataPromise) {
    await props.fetchDataPromise
  } else {
    console.error('fetchDataPromise is undefined')
  }
  const ctx = document.getElementById('myChart') as HTMLCanvasElement

  if (ctx) {
    const datasets: Dataset[] = []

    if (props.onErrorPerData.length > 0) {
      datasets.push({
        type: 'line',
        label: props.chartLabels.onErrorPerLabel,
        borderColor: props.chartColors.onErrorPerColor,
        backgroundColor: props.chartColors.onErrorPerColor,
        data: props.onErrorPerData as number[],
        borderDash: [0, 0],
        yAxisID: 'y2'
      })
    }

    if (props.consoleErrorPerData.length > 0) {
      datasets.push({
        type: 'line',
        label: props.chartLabels.consoleErrorPerLabel,
        borderColor: props.chartColors.consoleErrorPerColor,
        backgroundColor: props.chartColors.consoleErrorPerColor,
        data: props.consoleErrorPerData as number[],
        borderDash: [0, 0],
        yAxisID: 'y2'
      })
    }

    if (props.onErrorData.length > 0) {
      datasets.push({
        type: props.chartType === 'bar' ? 'bar' : 'line',
        label: props.chartLabels.onErrorLabel,
        data: props.onErrorData as number[],
        backgroundColor: props.chartColors.onErrorColor,
        stack: props.chartType === 'bar' ? 'combined' : undefined,
        yAxisID: 'y1'
      })
    }

    if (props.consoleErrorData.length > 0) {
      datasets.push({
        type: props.chartType === 'bar' ? 'bar' : 'line',
        label: props.chartLabels.consoleErrorLabel,
        data: props.consoleErrorData as number[],
        backgroundColor: props.chartColors.consoleErrorColor,
        stack: props.chartType === 'bar' ? 'combined' : undefined,
        yAxisID: 'y1'
      })
    }

    myChart = new Chart(ctx, {
      type: props.chartType,
      data: {
        labels: props.labels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            stacked: props.chartType === 'bar'
          },
          y1: {
            type: 'linear',
            position: 'left',
            stacked: props.chartType === 'bar'
          },
          y2: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + '%'
              }
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    })
  } else {
    console.error('Failed to initialize chart')
  }
})
</script>
