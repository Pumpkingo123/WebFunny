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
          :lineData=[httpPerError]
          :barData=[httpError]
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
            barDes1: '发生错误'
          }"
          chartType="combined"
        />
      </div>
      <div class="mt-4 ml-4 text-lg font-bold">今日概况（{{ formattedDate }}）</div>
      <div class="flex ml-4 gap-5 items-center h-40">
        <div
          v-for="(status, index) in ProjectStatus"
          :key="index"
          class="flex justify-center items-center bg-white rounded-lg gap-5 bg-gray-100 h-30 w-50"
          :class="`bg-${status.color}-100`"
        >
          <div
            :class="`bg-gradient-to-r from-${status.color}-500 to-${status.color}-200 text-white w-15 h-15 rounded-full flex items-center font-bold justify-center text-base font-medium`"
          >
            {{ status.status }}
          </div>
          <div class="flex-col flex justify-center items-center">
            <div class="text-3xl font-bold">{{ status.count }}</div>
            <div class="text-gray-600 text-ssm text-gray-500">发生次数</div>
          </div>
        </div>
      </div>
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
const ProjectStatus = ref<Status[]>([])
const formattedDate = ref(format(now, 'MM-dd'))

type Status = {
  status: String;
  count: Number;
  color: String;
};

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
  ProjectStatus.value = statusListGroup
  const colors = ['blue', 'blue', 'red', 'red']
  ProjectStatus.value = statusListGroup.map((status, index) => ({
    ...status,
    color: colors[index]
  }))
  console.log(ProjectStatus.value)
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
