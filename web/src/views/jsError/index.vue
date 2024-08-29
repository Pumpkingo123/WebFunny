<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 bg-white rounded-lg mx-5">
      <TabBar
        :barItems="barItems"
        :activeKey="activeKey"
        @menuChange="handleMenuChange"
        class="border-solid border-b-2"
      />
      <div class="w-full h-10 mt-1 flex justify-between">
        <div class="w-35 ml-4 flex flex-row justify-between">
          <div class="h-full w-18 items-center flex text-lg">时间范围</div>
          <div class="w-10 flex items-center text-lg">{{ rangeLabel }}</div>
        </div>
        <div class="hh w-65 mr-4" color="red">
          <dataRangePicker
            @update:rangeLabel="handleRangeLabelUpdate"
            @update:range="handleRangeUpdate"
          />
        </div>
      </div>
      <div style="height: 18rem; width: 100%; background-color: white">
        <chart
          :labels="labels"
          :lineData="[onErrorPerData, consoleErrorPerData]"
          :barData="[onErrorData, consoleErrorData]"
          :range="range"
          :name="'allCount'"
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
    <div class="gap-5 mt-3 mx-4 h-75 flex mb-2 justify-between">
      <div class="bg-white w-1/2 h-full rounded-lg">
        <div class="w-full h-10 flex flex-row justify-between">
          <div class="h-full leading-10 ml-3 text-base">JS错误（onerror）</div>
          <div class="h-full leading-10 mr-3">{{ formattedDate }}</div>
        </div>
        <div class="w-full h-60">
          <chart
            :labels="labels1"
            :barData="[jsErrorData]"
            :name="'jsCount'"
            :yAxisIDBar="'y1'"
            :fetchDataPromise="fetchDataPromise"
            :chartColors="{
              barCol1: '#3695ff'
            }"
            :chartLabels="{
              barDes1: '错误量'
            }"
            chartType="bar"
          />
        </div>
      </div>
      <div class="bg-white w-1/2 h-full rounded-lg">
        <div class="w-full h-10 flex flex-row justify-between">
          <div class="h-full leading-10 ml-3 text-base">自定义异常（consoleError）</div>
          <div class="h-full leading-10 mr-3">{{ formattedDate }}</div>
        </div>
        <div class="w-full h-60">
          <chart
            :labels="labels1"
            :barData="[consoleData]"
            :name="'consoleCount'"
            :yAxisIDBar="'y1'"
            :fetchDataPromise="fetchDataPromise"
            :chartColors="{
              barCol1: '#7a79ff'
            }"
            :chartLabels="{
              barDes1: '错误量'
            }"
            chartType="bar"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { barItems } from '@/config/jsErrorBar'
import { generateLabels } from '@/utils/generateLabels'
import { getJsData, getJsErrorCountListByHour } from '@/api/jsError'
import { formatData } from '@/utils/formatData'
import { format } from 'date-fns'
import dataRangePicker from '@/components/dateRangePicker.vue'
import Chart from '@/components/chart.vue'

const activeKey = ref('over')
const barItem = ref(barItems)
const range = ref<number[]>([0, Date.now()])
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)
const rangeLabel = ref<string>('')
const onErrorData = ref<number[]>([])
const consoleErrorData = ref<number[]>([])
const onErrorPerData = ref<number[]>([])
const consoleErrorPerData = ref<number[]>([])
const jsErrorData = ref<number[]>([])
const consoleData = ref<number[]>([])
const labels = ref<string[]>([])
const labels1 = ref<string[]>([])
const borderColor = ref<string>('')
const backgroundColor = ref<string>('')
const now = new Date()
const formattedDate = ref(format(now, 'dd/MM/yyyy'))

const handleRangeLabelUpdate = (newRangeLabel: string) => {
  rangeLabel.value = newRangeLabel
}

const handleRangeUpdate = (newRange: number[]) => {
  range.value = newRange
}

const handleMenuChange = (key: string, event: MouseEvent) => {
  activeKey.value = key
}

const fetchData = async () => {
  const startDate = format(new Date(range.value[0]), 'yyyy-MM-dd')
  const endDate = format(new Date(range.value[1]), 'yyyy-MM-dd')
  const [allData, jsData] = await Promise.all([
    getJsData(startDate, endDate, rangeLabel.value),
    getJsErrorCountListByHour({ timeType: 0, webMonitorId: '1' })
  ])
  const { onError, consoleError, onErrorPer, consoleErrorPer } = allData.data
  const { onError: jsData1, consoleError: consoleData1 } = jsData.data
  labels.value = generateLabels(range.value[0], range.value[1])
  labels1.value = generateLabels(
    now.setHours(0, 0, 0, 0),
    now.setHours(21, 0, 0, 0),
    'HH:mm',
    'hour'
  )
  jsErrorData.value = formatData(jsData1, labels1.value, 'hour')
  consoleData.value = formatData(consoleData1, labels1.value, 'hour')
  onErrorData.value = formatData(onError, labels.value, 'day')
  consoleErrorData.value = formatData(consoleError, labels.value, 'day')
  onErrorPerData.value = formatData(onErrorPer, labels.value, 'day')
  consoleErrorPerData.value = formatData(consoleErrorPer, labels.value, 'day')
  borderColor.value = '#2cdd96'
  backgroundColor.value = '#2cdd96'
}

watch(range, (newRange) => {
  labels.value = generateLabels(newRange[0], newRange[1])
  fetchDataPromise.value = fetchData()
})

onMounted(async () => {
  activeKey.value = barItem.value[0].key
  fetchDataPromise.value = fetchData()
  await nextTick()
})
</script>
