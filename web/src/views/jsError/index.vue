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
          <dataRangePicker @update:rangeLabel="handleRangeLabelUpdate" @update:range="handleRangeUpdate" />
        </div>
      </div>
      <div style="height: 100%; width: 100%; background-color: white">
        <chart
          :labels="labels"
          :lineData1="onErrorPerData"
          :lineData2="consoleErrorPerData"
          :barData1="onErrorData"
          :barData2="consoleErrorData"
          :range="range"
          :yAxisIDBar="'y1'"
          :yAxisIDLine="'y2'"
          :fetchDataPromise="fetchDataPromise"
          :chartColors="{
            lineCol1: '#2cdd96',
            lineCol2: '#ff8639',
            barCol2: '#58aefc',
            barCol1: '#7a79ff'
          }"
          :chartLabels="{
            lineDes1: 'jsErrorPer',
            lineDes2: 'consoleErrorPer',
            barDes1: 'onError',
            barDes2: 'consoleError'
          }"
          chartType="combined"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { barItems } from '@/config/jsErrorBar'
import { generateLabels } from '@/utils/generateLabels'
import { getJsData } from '@/api/ColumnBar'
import { formatData } from '@/utils/formatData'
import { format } from 'date-fns'
import dataRangePicker from '@/components/dateRangePicker.vue'
import Chart from '@/components/chart.vue'

const indicatorRef = ref<HTMLElement | null>(null)
const activeKey = ref('over')
const barItem = ref(barItems)
const range = ref<number[]>([0, Date.now()]);
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)
const rangeLabel = ref<string>('')
const onErrorData = ref<number[]>([])
const consoleErrorData = ref<number[]>([])
const onErrorPerData = ref<number[]>([])
const consoleErrorPerData = ref<number[]>([])
const labels = ref<string[]>([])
const borderColor = ref<string>('')
const backgroundColor = ref<string>('')

const handleRangeLabelUpdate = (newRangeLabel: string) => {
  rangeLabel.value = newRangeLabel
}

const handleRangeUpdate = (newRange: number[]) => {
  range.value = newRange
}

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

const fetchData = async () => {
  const startDate = format(new Date(range.value[0]), 'yyyy-MM-dd')
  const endDate = format(new Date(range.value[1]), 'yyyy-MM-dd')
  const response = await getJsData(startDate, endDate, rangeLabel.value)
  if (response.code === 200 && response.data) {
    const { onError, consoleError, onErrorPer, consoleErrorPer } = response.data
    // Update the reactive labels variable
    labels.value = generateLabels(range.value[0], range.value[1])
    onErrorData.value = formatData(onError, labels.value, 'day')
    consoleErrorData.value = formatData(consoleError, labels.value, 'day')
    onErrorPerData.value = formatData(onErrorPer, labels.value, 'day')
    consoleErrorPerData.value = formatData(consoleErrorPer, labels.value, 'day')
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