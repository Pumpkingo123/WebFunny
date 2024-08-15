<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 h-74 bg-white rounded-lg mx-5">
      <div class="border-b-2 border-b-black-500 h-10">
        <div
          v-for="item in barItems"
          :class="[
            'inline-block text-lg text-center cursor-pointer mt-2 mr-12 ml-3 relative',
            { 'text-orange-500 active-tab': item.key === activeKey }
          ]"
          @click="handleMenuChange(item.key, $event)"
        >
          {{ item.label }}
        </div>
        <span
          ref="indicatorRef"
          class="absolute top-[50px] left-0 h-1 bg-orange-500"
          style="
            transition:
              left 0.3s ease,
              width 0.3s ease;
          "
        ></span>
      </div>
      <div class="w-full h-10 mt-1 flex justify-between">
        <div class="w-35 ml-4 flex flex-row justify-between">
          <div class="h-full w-20 items-center flex text-lg">时间范围</div>
          <div class="w-10 flex items-center text-lg">{{ rangeLabel }}</div>
        </div>
        <div class="hh w-65 mr-4" color="red">
          <n-date-picker v-model:value="range" type="daterange" clearable />
        </div>
      </div>
      <div style="height: 100%; width: 100%; background-color: white">
        <canvas id="myChart" style="height: 100%; width: 100%"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { barItems } from '@/config/jsErrorBar'
import Chart from 'chart.js/auto'
import { format } from 'date-fns'
import ColumnBar from '@/api/ColumnBar'

// References and reactive variables
const indicatorRef = ref<HTMLElement | null>(null)
const activeKey = ref('over')
const barItem = ref(barItems)
const range = ref([1723135260000, Date.now()])
const labels = ref<string[]>([])
const data1 = ref<any[]>([])
const perData1 = ref<any[]>([])

const rangeLabel = computed(() => {
  const startDate = new Date(range.value[0])
  const endDate = new Date(range.value[1])
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return `${diffDays}天`
})

let myChart: Chart<'bar' | 'line', any[], string> | null = null

// Function to update the position of the indicator
const updateIndicatorPosition = (element) => {
  const rect = element.getBoundingClientRect()
  const parentRect = element.parentElement.getBoundingClientRect()
  const newLeft = rect.left - parentRect.left
  if (indicatorRef.value) {
    indicatorRef.value.style.left = `${newLeft + 20}px`
    indicatorRef.value.style.width = `${rect.width}px`
  }
}

// Function to handle menu changes
const handleMenuChange = (key, event) => {
  activeKey.value = key
  updateIndicatorPosition(event.target)
}

// Function to generate chart labels based on the selected date range
const generateLabels = (start, end) => {
  const labelList: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  while (startDate <= endDate) {
    labelList.push(format(startDate, 'MM-dd'))
    startDate.setDate(startDate.getDate() + 1)
  }
  return labelList
}

const fetchData = async () => {
  const startDate = format(new Date(range.value[0]), 'yyyy-MM-dd')
  const endDate = format(new Date(range.value[1]), 'yyyy-MM-dd')
  const response = await ColumnBar.getHttpData(startDate, endDate, rangeLabel)

  if (response.code === 200 && response.data) {
    const { data, perData } = response.data

    // Update the reactive labels variable
    labels.value = generateLabels(range.value[0], range.value[1])

    const formatData = (data) => {
      return labels.value.map((label) => {
        const item = data.find((d) => d.day === label)
        return item ? item.count : 0
      })
    }

    // Update the reactive data variables
    data1.value = formatData(data)
    perData1.value = formatData(perData)

    console.log('1111',data1)
    console.log('2222',perData1)

    // Update the chart data if the chart has been initialized
    if (myChart) {
      myChart.data.labels = labels.value
      myChart.data.datasets[0].data = perData1.value
      myChart.data.datasets[1].data = data1.value
      myChart.update()
    }
  } else {
    console.error('Failed to fetch data')
  }
}

watch(range, (newRange) => {
  if (myChart) {
    labels.value = generateLabels(newRange[0], newRange[1])
    myChart.data.labels = labels.value
    fetchData()
  }
})

onMounted(async () => {
  activeKey.value = barItem.value[0].key
  await nextTick()
  await fetchData()

  const ctx = document.getElementById('myChart') as HTMLCanvasElement
  if (ctx) {
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.value,
        datasets: [
          {
            type: 'line',
            label: '错误率',
            borderColor: '#28c989',
            backgroundColor: '#28c989',
            data: perData1.value,
            borderDash: [0, 0],
            yAxisID: 'y2'
          },
          {
            type: 'bar',
            label: '发生次数',
            data: data1.value,
            backgroundColor: '#59aefc',
            stack: 'combined',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y1: {
            type: 'linear',
            position: 'left',
            stacked: true
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

<style scoped></style>
