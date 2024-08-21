<template>
  <div style="height: 100%; width: 100%; background-color: white">
    <canvas :id="canvasId" style="height: 100%; width: 100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

// Props
const props = defineProps({
  name: String,
  yAxisIDBar: String,
  yAxisIDLine: String,
  labels: Array,
  lineData2: {
    type: Array,
    default: () => []
  },
  lineData1: {
    type: Array,
    default: () => []
  },
  barData1: {
    type: Array,
    default: () => []
  },
  barData2: {
    type: Array,
    default: () => []
  },
  range: Array,
  fetchDataPromise: Promise,
  chartColors: {
    type: Object,
    default: () => ({
      barCol2: '#2cdd96',
      barCol1: '#ff8639',
      lineCol2: '#58aefc',
      lineCol1: '#9596fc'
    })
  },
  chartLabels: {
    type: Object,
    default: () => ({
      lineDes1: 'line1',
      lineDes2: 'line2',
      barDes1: 'bar1',
      barDes2: 'bar2'
    })
  },
  chartType: {
    type: String,
    default: 'bar'
  }
})

const canvasId = `chart-${props.name}`

// Chart instance
let chartInstance: Chart<'bar' | 'line', unknown[] | undefined, unknown> | null = null

const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

const fetch = () => {
  if (chartInstance) {
    chartInstance.data.labels = props.labels as string[]

    // 重新构造数据集
    const updatedDatasets: Dataset[] = []

    // 仅在有数据的情况下更新
    if (props.lineData1 && props.lineData1.length > 0) {
      updatedDatasets.push({
        type: 'line',
        label: props.chartLabels.lineDes1,
        borderColor: props.chartColors.lineCol1,
        backgroundColor: props.chartColors.lineCol1,
        data: props.lineData1 as number[],
        borderDash: [0, 0],
        yAxisID: props.yAxisIDLine,
        tension: 4
      })
    }

    if (props.lineData2 && props.lineData2.length > 0) {
      updatedDatasets.push({
        type: 'line',
        label: props.chartLabels.lineDes2,
        borderColor: props.chartColors.lineCol2,
        backgroundColor: props.chartColors.lineCol2,
        data: props.lineData2 as number[],
        borderDash: [0, 0],
        yAxisID: props.yAxisIDLine,
        tension: 16
      })
    }

    if (props.barData1 && props.barData1.length > 0) {
      updatedDatasets.push({
        type: 'bar',
        label: props.chartLabels.barDes1,
        data: props.barData1 as number[],
        borderColor: props.chartColors.barCol1,
        backgroundColor: props.chartColors.barCol1,
        borderDash: [0, 0],
        yAxisID: props.yAxisIDBar
      })
    }

    if (props.barData2 && props.barData2.length > 0) {
      updatedDatasets.push({
        type: 'bar',
        label: props.chartLabels.barDes2,
        data: props.barData2 as number[],
        borderColor: props.chartColors.barCol2,
        backgroundColor: props.chartColors.barCol2,
        borderDash: [0, 0],
        yAxisID: props.yAxisIDBar
      })
    }

    chartInstance.data.datasets = updatedDatasets
    chartInstance.update()
  }
}

watch(
  () => props.range,
  async () => {
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
  destroyChart()
  console.log('Chart is destroyed')
  await nextTick()
  if (props.fetchDataPromise) {
    await props.fetchDataPromise
  } else {
    console.error('fetchDataPromise is undefined')
  }
  const ctx = document.getElementById(canvasId) as HTMLCanvasElement
  if (ctx) {
    const datasets: Dataset[] = []
    if (props.lineData1.length > 0) {
      datasets.push({
        type: props.chartType === 'line' || props.chartType === 'combined' ? 'line' : 'bar',
        label: props.chartLabels.lineDes1,
        borderColor: props.chartColors.lineCol1,
        backgroundColor: props.chartColors.lineCol1,
        data: props.lineData1 as number[],
        borderDash: [0, 0],
        yAxisID: props.yAxisIDLine
      })
    }

    if (props.lineData2.length > 0) {
      datasets.push({
        type: props.chartType === 'line' || props.chartType === 'combined' ? 'line' : 'bar',
        label: props.chartLabels.lineDes2,
        borderColor: props.chartColors.lineCol2,
        backgroundColor: props.chartColors.lineCol2,
        data: props.lineData2 as number[],
        borderDash: [0, 0],
        yAxisID: props.yAxisIDLine
      })
    }

    if (props.barData1.length > 0) {
      datasets.push({
        type: props.chartType === 'bar' || props.chartType === 'combined' ? 'bar' : 'line',
        label: props.chartLabels.barDes1,
        data: props.barData1 as number[],
        borderColor: props.chartColors.barCol1,
        backgroundColor: props.chartColors.barCol1,
        borderDash: [0, 0],
        yAxisID: props.yAxisIDBar
      })
    }

    if (props.barData2.length > 0) {
      datasets.push({
        type: props.chartType === 'bar' || props.chartType === 'combined' ? 'bar' : 'line',
        label: props.chartLabels.barDes2,
        data: props.barData2 as number[],
        borderColor: props.chartColors.barCol2,
        backgroundColor: props.chartColors.barCol2,
        borderDash: [0, 0],
        yAxisID: props.yAxisIDBar
      })
    }
    console.log('new chart build')
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.labels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y1: {
            type: 'linear',
            position: 'left',
            stacked: props.chartType === 'bar' || props.chartType === 'combined'
          },
          ...(props.chartType === 'combined' && {
            y2: {
              type: 'linear',
              position: 'right',
              ticks: {
                callback: function (value) {
                  return value + '%'
                }
              }
            }
          })
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

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<style scoped>
/* Your styles here */
</style>
