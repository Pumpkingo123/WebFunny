<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 bg-white rounded-lg mx-5">
      <TabBar :barItems="barItems" :activeKey="activeKey" @menuChange="handleMenuChange" />
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
      <div style="height: 12rem; width: 100%; background-color: white">
        <chart
          :labels="labels"
          :lineData1="httpPerError"
          :barData1="httpError"
          :range="range"
          :name="'allCount'"
          :yAxisIDBar="'y1'"
          :yAxisIDLine="'y2'"
          :fetchDataPromise="fetchDataPromise"
          :chartColors="{
            lineCol1: '#2cdd96',
            barCol1: '#3695ff'
          }"
          :chartLabels="{
            lineDes1: '错误率',
            barDes1: '发生错误',
          }"
          chartType="combined"
        />
      </div>
      <div class="mt-4 ml-4 text-lg font-bold">今日概况（{{ formattedDate }}）</div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { getHttpErrorCountByDay, getStatusListGroupByErrorCode } from '@/api/httpError'
import { barItems } from '@/config/httpErrorBar'
import { format } from 'date-fns'
import dataRangePicker from '@/components/dateRangePicker.vue'
import Chart from '@/components/chart.vue'
import { formatData } from '@/utils/formatData'
import { generateLabels } from '@/utils/generateLabels'

const activeKey = ref('over')
const rangeLabel = ref<string>('')
const range = ref<number[]>([0, Date.now()])
const labels = ref<string[]>([])
const httpError = ref<number[]>([])
const httpPerError = ref<number[]>([])
const barItem = ref(barItems)
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)
  const now = new Date()
const formattedDate = ref(format(now, 'MM-dd'))

const handleMenuChange = (key: string, event: MouseEvent) => {
  activeKey.value = key
}

const handleRangeLabelUpdate = (newRangeLabel: string) => {
  rangeLabel.value = newRangeLabel
}

const handleRangeUpdate = (newRange: number[]) => {
  range.value = newRange
}

const fetchData = async () => {
  const startDate = format(new Date(range.value[0]), 'yyyy-MM-dd')
  const endDate = format(new Date(range.value[1]), 'yyyy-MM-dd')
  const [httpErrorData, statusListGroupByErrorCode] = await Promise.all([
    getHttpErrorCountByDay(startDate, endDate, rangeLabel.value),
    getStatusListGroupByErrorCode({ timeType: 0, webMonitorId: '1' })
  ])
  const { data, perData } = httpErrorData.data
  labels.value = generateLabels(range.value[0], range.value[1])
  httpError.value = formatData(data, labels.value, 'day')
  httpPerError.value = formatData(perData, labels.value, 'day')
  const { data: statusListGroup } = statusListGroupByErrorCode
}

onMounted(async () => {
  activeKey.value = barItem.value[0].key
  fetchDataPromise.value = fetchData()
  await nextTick()
})

watch(range, (newRange) => {
  labels.value = generateLabels(newRange[0], newRange[1])
  fetchDataPromise.value = fetchData()
})
</script>
