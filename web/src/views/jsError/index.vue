<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 h-74 bg-white rounded-lg mx-5">
      <div class="border-b-2 border-b-black-500 h-10">
        <div
          v-for="item in barItems"
          :class="[ 'inline-block text-lg text-center cursor-pointer mt-2 mr-12 ml-3 relative', { 'text-orange-500 active-tab': item.key === activeKey } ]"
          @click="handleMenuChange(item.key, $event)"
        >
          {{ item.label }}
        </div>
        <span
          ref="indicatorRef"
          class="absolute top-[50px] left-0 h-1 bg-orange-500"
          style=" transition: left 0.3s ease, width 0.3s ease; "
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
        <chart
          :labels="labels"
          :onErrorData="onErrorData"
          :consoleErrorData="consoleErrorData"
          :onErrorPerData="onErrorPerData"
          :consoleErrorPerData="consoleErrorPerData"
          :range="range"
          :fetchDataPromise="fetchDataPromise"
          :chartColors="{
            onErrorPerColor: '#2cdd96',
            consoleErrorPerColor: '#ff8639',
            onErrorColor: '#58aefc',
            consoleErrorColor: '#9596fc'
          }"
          :chartLabels="{
            onErrorPerLabel: 'jsError',
            consoleErrorPerLabel: 'consoleError',
            onErrorLabel: 'onErrorPer',
            consoleErrorLabel: 'consoleErrorPer'
          }"
          chartType="bar"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { barItems } from '@/config/jsErrorBar'
import { format } from 'date-fns'
import { getJsData } from '@/api/ColumnBar'
import Chart from '@/components/chart.vue'

// References and reactive variables
const indicatorRef = ref<HTMLElement | null>(null)
const activeKey = ref('over')
const barItem = ref(barItems)
const range = ref<[number, number]>([1723135260000, Date.now()])
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined);

const rangeLabel = computed(() => {
  const startDate = new Date(range.value[0])
  const endDate = new Date(range.value[1])
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return `${diffDays}天`
})

const onErrorData = ref<number[]>([])
const consoleErrorData = ref<number[]>([])
const onErrorPerData = ref<number[]>([])
const consoleErrorPerData = ref<number[]>([])
const labels = ref<string[]>([])
const borderColor = ref<string>("")
const backgroundColor = ref<string>("")

// Function to update the position of the indicator
const updateIndicatorPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const parentRect = element.parentElement!.getBoundingClientRect()
  const newLeft = rect.left - parentRect.left
  if (indicatorRef.value) {
    indicatorRef.value.style.left = `${newLeft + 20}px`
    indicatorRef.value.style.width = `${rect.width}px`
  }
}

// Function to handle menu changes
const handleMenuChange = (key: string, event: MouseEvent) => {
  activeKey.value = key
  updateIndicatorPosition(event.target as HTMLElement)
}

// Function to generate chart labels based on the selected date range
const generateLabels = (start: number, end: number) => {
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
  const response = await getJsData(startDate, endDate, rangeLabel.value)

  if (response.code === 200 && response.data) {
    const { onError, consoleError, onErrorPer, consoleErrorPer } = response.data

    // Update the reactive labels variable
    labels.value = generateLabels(range.value[0], range.value[1])

    const formatData = (data: { day: string, count: number }[]) => {
      return labels.value.map((label) => {
        const item = data.find((d) => d.day === label)
        return item ? item.count : 0
      })
    }

    onErrorData.value = formatData(onError)
    consoleErrorData.value = formatData(consoleError)
    onErrorPerData.value = formatData(onErrorPer)
    consoleErrorPerData.value = formatData(consoleErrorPer)
    borderColor.value = '#2cdd96'
    backgroundColor.value = '#2cdd96'
  } else {
    console.error('Failed to fetch data')
  }
}

watch(range, (newRange) => {
  labels.value = generateLabels(newRange[0], newRange[1])
  fetchDataPromise.value = fetchData()
})

onMounted(async () => {
  activeKey.value = barItem.value[0].key
  fetchDataPromise.value = fetchData()
})
</script>