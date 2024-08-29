<template>
  <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
    健康数据
    <div class="mr-5"><datePicker @update:timestamp="handleDateUpdate" /></div>
  </div>
  <div class="h-60 mx-4 mt-4 bg-white rounded-lg flex flex-row">
    <div class="w-1/3 h-full flex justify-center items-center">
      <n-progress
        :style="{ width: '150px', color: progressColor }"
        type="circle"
        :color="progressColor"
        :percentage="score"
      >
        <div class="flex flex-col">
          <span style="text-align: center" class="text-4xl font-bold">{{ score }}</span>
          <span style="text-align: center" class="text-base">健康状态</span>
        </div>
      </n-progress>
    </div>
    <div class="w-2/3 h-full flex justify-around items-center">
    <s-progress color="#ff4e5c" :percentage="score1" label="JS错误" />
    <s-progress color="#7a79ff" :percentage="score2" label="自定义异常" />
    <s-progress color="#3695ff" :percentage="score3" label="静态资源异常" />
    <s-progress color="#ff9724" :percentage="score4" label="接口异常" />
  </div>
  </div>
  <div class="h-160 flex flex-row flex-wrap justify-between mt-14 rounded-lg mx-4 mb-10">
    <Card
      class="mr-4"
      title="js报错趋势"
      name="userCount1"
      :labels="labels"
      :lineData=[httpErrorCount,httpErrorCount7]
      yAxisIDLine="y1"
      :range="timestamp"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '当天',
        lineDes2: '一周前'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="自定义异常趋势"
      name="userCount2"
      :labels="labels"
      :range="timestamp"
      :lineData=[jsErrorCount,jsErrorCount7]
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '当天',
        lineDes2: '一周前'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="静态资源加载报错"
      name="userCount3"
      :labels="labels"
      :range="timestamp"
      :lineData=[resourceErrorCount,resourceErrorCount7]
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '当天',
        lineDes2: '一周前'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="接口请求报错"
      name="userCount4"
      :labels="labels"
      :lineData=[consoleErrorCount,consoleErrorCount7]
      :range="timestamp"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '当天',
        lineDes2: '一周前'
      }"
      chartType="line"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import {
  getErrorInfo,
  getHttpErrorCountByHour,
  getJavascriptConsoleErrorInfoListByHour,
  getResourceErrorCountByHour,
  getJsErrorCountByHour
} from '@/api/health'
import datePicker from '@/components/datePicker.vue'
import { formatData } from '@/utils/formatData'
import { generateLabels } from '@/utils/generateLabels'
import { subDays } from 'date-fns'
import Card from '@/views/overView/components/card.vue'
import SProgress from '@/views/overView/components/s-progress.vue'

const timestamp = ref<number>(0)
const timeSize = ref<number>(0)
const labels = ref<string[]>([])
const labels2 = ref<string[]>([])
const httpErrorCount = ref<number[]>([])
const httpErrorCount7 = ref<number[]>([])
const jsErrorCount = ref<number[]>([])
const jsErrorCount7 = ref<number[]>([])
const resourceErrorCount = ref<number[]>([])
const resourceErrorCount7 = ref<number[]>([])
const consoleErrorCount = ref<number[]>([])
const consoleErrorCount7 = ref<number[]>([])
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)
const score = ref<number>(0)
const score1 = ref<number>(0)
const score2 = ref<number>(0)
const score3 = ref<number>(0)
const score4 = ref<number>(0)
const now = new Date()
let yesterday = subDays(now, 1)
let lastWeek = subDays(now, 7)

const handleDateUpdate = (newDate: number) => {
  timestamp.value = newDate
  const currentHour = now.getHours()
  now.setTime(newDate)
  now.setHours(currentHour)
  yesterday = subDays(now, 1)
  lastWeek = subDays(now, 7)
}

const dateDiff = (date2: number) => {
  const date1 = new Date().getTime()
  timeSize.value = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24)
}

const fetchData = async () => {
  try {
    const params = {
      timeSize: timeSize.value,
      webMonitorId: '1'
    }
    const response = await getErrorInfo(params)
    const { data: ErrorInfo } = response
    score.value = ErrorInfo.customerLeaveRate + ErrorInfo.httpSecondOpenRate
    score1.value = Number(((ErrorInfo.jsErrorTotalCount / ErrorInfo.todayUvCount) * 100).toFixed(1))
    score2.value = Number(
      ((ErrorInfo.jsConsoleErrorTotalCount / ErrorInfo.todayUvCount) * 100).toFixed(1)
    )
    score3.value = Number(
      ((ErrorInfo.resourceErrorTotalCount / ErrorInfo.todayUvCount) * 100).toFixed(1)
    )
    score4.value = Number(
      ((ErrorInfo.httpErrorTotalCount / ErrorInfo.todayUvCount) * 100).toFixed(1)
    )
  } catch (error) {
    console.error(error)
  }
}

const fetchCard = async () => {
  try {
    const [
      httpErrorCountByHour,
      jsErrorCountByHour,
      resourceErrorCountByHour,
      javascriptConsoleErrorInfoListByHour
    ] = await Promise.all([
      getHttpErrorCountByHour(timeSize.value, 7, 1),
      getJsErrorCountByHour(timeSize.value, 7, 1),
      getResourceErrorCountByHour(timeSize.value, 7, 1),
      getJavascriptConsoleErrorInfoListByHour(timeSize.value, 7, 1)
    ])
    const { today: httpToday, seven: httpSeven } = httpErrorCountByHour.data
    const { today: jsToday, seven: jsSeven } = jsErrorCountByHour.data
    const { today: resourceToday, seven: resourceSeven } = resourceErrorCountByHour.data
    const { today: consoleToday, seven: consoleSeven } = javascriptConsoleErrorInfoListByHour.data
    labels.value = generateLabels(
      new Date(yesterday.setHours(now.getHours() + 1)).getTime(),
      new Date(now.setHours(now.getHours() - 1)).getTime(),
      'MM-dd HH','hour'
    )
    labels2.value = generateLabels(
      new Date(subDays(lastWeek, 1).setHours(now.getHours() + 2)).getTime(),
      new Date(lastWeek.setHours(now.getHours() - 1)).getTime(),
      'MM-dd HH','hour'
    )
    httpErrorCount.value = formatData(httpToday, labels.value, 'hour')
    httpErrorCount7.value = formatData(httpSeven, labels2.value, 'hour')
    jsErrorCount.value = formatData(jsToday, labels.value, 'hour')
    jsErrorCount7.value = formatData(jsSeven, labels2.value, 'hour')
    resourceErrorCount.value = formatData(resourceToday, labels.value, 'hour')
    resourceErrorCount7.value = formatData(resourceSeven, labels2.value, 'hour')
    consoleErrorCount.value = formatData(consoleToday, labels.value, 'hour')
    consoleErrorCount7.value = formatData(consoleSeven, labels2.value, 'hour')
  } catch (error) {
    console.error(error)
  }
}

const progressColor = computed(() => {
  if (score.value > 80) {
    return '#28c989'
  } else if (score.value > 60) {
    return '#ff9724'
  } else {
    return '#ff4e5c'
  }
})

watch(timestamp, (newDate) => {
  dateDiff(newDate)
  fetchDataPromise.value = fetchCard()
  fetchData()
})

onMounted(() => {
  fetchDataPromise.value = fetchCard()
  fetchData()
})
</script>
