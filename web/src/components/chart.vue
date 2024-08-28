<template>
  <div style="height: 100%; width: 100%; background-color: white">
    <canvas :id="canvasId" style="height: 100%; width: 100%"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'
import { defaultChartColors, defaultChartLabels, createDataset } from '@/config/chartConfig'

// Props
const props = defineProps({
  name: String,
  yAxisIDBar: String,
  yAxisIDLine: String,
  labels: Array,
  lineData: {
    type: Array<Array<number>>,
    default: () => []
  },
  barData: {
    type: Array<Array<number>>,
    default: () => []
  },
  range: Array,
  fetchDataPromise: Promise,
  chartColors: {
    type: Object,
    default: () => defaultChartColors
  },
  chartLabels: {
    type: Object,
    default: () => defaultChartLabels
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
    const updatedDatasets: ChartDataset<'line' | 'bar'>[] = []

    // 动态处理 lineData
    props.lineData.forEach((data, index) => {
      if (data.length > 0) {
        updatedDatasets.push(
          createDataset(
            'line',
            props.chartLabels[`lineDes${index + 1}`],
            data,
            props.chartColors[`lineCol${index + 1}`],
            props.chartColors[`lineCol${index + 1}`],
            props.yAxisIDLine
          )
        )
      }
    })

    // 动态处理 barData
    props.barData.forEach((data, index) => {
      if (data.length > 0) {
        updatedDatasets.push(
          createDataset(
            'bar',
            props.chartLabels[`barDes${index + 1}`],
            data,
            props.chartColors[`barCol${index + 1}`],
            props.chartColors[`barCol${index + 1}`],
            props.yAxisIDBar
          )
        )
      }
    })

    chartInstance.data.datasets = updatedDatasets
    chartInstance.update()
  }
}

const initializeChart = async () => {
  if (props.lineData.length > 0 || props.barData.length > 0) {
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
      const datasets: ChartDataset<'line' | 'bar'>[] = []

      // 动态处理 lineData
      props.lineData.forEach((data, index) => {
        if (data.length > 0) {
          datasets.push(
            createDataset(
              props.chartType === 'line' || props.chartType === 'combined' ? 'line' : 'bar',
              props.chartLabels[`lineDes${index + 1}`],
              data,
              props.chartColors[`lineCol${index + 1}`],
              props.chartColors[`lineCol${index + 1}`],
              props.yAxisIDLine
            )
          )
        }
      })

      // 动态处理 barData
      props.barData.forEach((data, index) => {
        if (data.length > 0) {
          datasets.push(
            createDataset(
              props.chartType === 'bar' || props.chartType === 'combined' ? 'bar' : 'line',
              props.chartLabels[`barDes${index + 1}`],
              data,
              props.chartColors[`barCol${index + 1}`],
              props.chartColors[`barCol${index + 1}`],
              props.yAxisIDBar
            )
          )
        }
      })

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
  } else {
    console.log('No data available to create chart')
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

onMounted(() => {
  initializeChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>