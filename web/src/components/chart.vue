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
  lineData2: {
    type: Array<number>,
    default: () => []
  },
  lineData1: {
    type: Array<number>,
    default: () => []
  },
  barData1: {
    type: Array<number>,
    default: () => []
  },
  barData2: {
    type: Array<number>,
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

    // 仅在有数据的情况下更新
    if (props.lineData1 && props.lineData1.length > 0) {
      updatedDatasets.push(
        createDataset(
          'line',
          props.chartLabels.lineDes1,
          props.lineData1,
          props.chartColors.lineCol1,
          props.chartColors.lineCol1,
          props.yAxisIDLine
        )
      )
    }

    if (props.lineData2 && props.lineData2.length > 0) {
      updatedDatasets.push(
        createDataset(
          'line',
          props.chartLabels.lineDes2,
          props.lineData2,
          props.chartColors.lineCol2,
          props.chartColors.lineCol2,
          props.yAxisIDLine
        )
      )
    }

    if (props.barData1 && props.barData1.length > 0) {
      updatedDatasets.push(
        createDataset(
          'bar',
          props.chartLabels.barDes1,
          props.barData1,
          props.chartColors.barCol1,
          props.chartColors.barCol1,
          props.yAxisIDBar
        )
      )
    }

    if (props.barData2 && props.barData2.length > 0) {
      updatedDatasets.push(
        createDataset(
          'bar',
          props.chartLabels.barDes2,
          props.barData2,
          props.chartColors.barCol2,
          props.chartColors.barCol2,
          props.yAxisIDBar
        )
      )
    }

    chartInstance.data.datasets = updatedDatasets
    chartInstance.update()
  }
}

const initializeChart = async () => {
  if (props.lineData1 || props.lineData2 || props.barData1 || props.barData2) {
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
      if (props.lineData1.length > 0) {
        datasets.push(
          createDataset(
            props.chartType === 'line' || props.chartType === 'combined' ? 'line' : 'bar',
            props.chartLabels.lineDes1,
            props.lineData1,
            props.chartColors.lineCol1,
            props.chartColors.lineCol1,
            props.yAxisIDLine
          )
        )
      }

      if (props.lineData2.length > 0) {
        datasets.push(
          createDataset(
            props.chartType === 'line' || props.chartType === 'combined' ? 'line' : 'bar',
            props.chartLabels.lineDes2,
            props.lineData2,
            props.chartColors.lineCol2,
            props.chartColors.lineCol2,
            props.yAxisIDLine
          )
        )
      }

      if (props.barData1.length > 0) {
        datasets.push(
          createDataset(
            props.chartType === 'bar' || props.chartType === 'combined' ? 'bar' : 'line',
            props.chartLabels.barDes1,
            props.barData1,
            props.chartColors.barCol1,
            props.chartColors.barCol1,
            props.yAxisIDBar
          )
        )
      }

      if (props.barData2.length > 0) {
        datasets.push(
          createDataset(
            props.chartType === 'bar' || props.chartType === 'combined' ? 'bar' : 'line',
            props.chartLabels.barDes2,
            props.barData2,
            props.chartColors.barCol2,
            props.chartColors.barCol2,
            props.yAxisIDBar
          )
        )
      }
      console.log('new chart build')
      console.log('2')
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
