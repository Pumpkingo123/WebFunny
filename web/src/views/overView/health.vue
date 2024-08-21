<template>
  <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
    健康数据
    <div class="mr-5"><datePicker @update:timestamp="handleDateUpdate" /></div>
  </div>
  <div class="h-60 mx-4 mt-4 bg-white rounded-lg"></div>
  <div class="h-160 flex flex-row flex-wrap justify-between mt-14 rounded-lg mx-4 mb-10">
    <Card
      class="mr-4"
      title="js报错趋势"
      name="userCount1"
      :labels="labels"
      :lineData1="httpErrorCount"
      :lineData2="httpErrorCount7"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '一周前',
        lineDes2: '当天'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="自定义异常趋势"
      name="userCount2"
      :labels="labels"
      :lineData1="jsErrorCount"
      :lineData2="jsErrorCount7"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '一周前',
        lineDes2: '当天'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="静态资源加载报错"
      name="userCount3"
      :labels="labels"
      :lineData1="resourceErrorCount"
      :lineData2="resourceErrorCount7"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '一周前',
        lineDes2: '当天'
      }"
      chartType="line"
    />
    <Card
      class="mr-4"
      title="接口请求报错"
      name="userCount4"
      :labels="labels"
      :lineData1="consoleErrorCount"
      :lineData2="consoleErrorCount7"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchDataPromise"
      :chartColors="{
        lineCol1: '#ffa627',
        lineCol2: '#bfcfff'
      }"
      :chartLabels="{
        lineDes1: '一周前',
        lineDes2: '当天'
      }"
      chartType="line"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  getErrorInfo,
  getHttpErrorCountByHour,
  getJavascriptConsoleErrorInfoListByHour,
  getResourceErrorCountByHour,
  getJsErrorCountByHour
} from '@/api/health'
import datePicker from '@/components/datePicker.vue'
import { formatData } from '@/utils/formatData'
import { generateLabelsHour } from '@/utils/generateLabelsHour'
import Card from '@/views/overView/components/card.vue'

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

const handleDateUpdate = (newDate: number) => {
  timestamp.value = newDate
}

const dateDiff = (date2: number) => {
  const date1 = new Date().getTime()
  timeSize.value = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24)
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
    labels.value = generateLabelsHour(
      new Date(2024, 7, 20, 15).getTime(),
      new Date(2024, 7, 21, 15).getTime()
    )
    labels2.value = generateLabelsHour(
      new Date(2024, 7, 13, 15).getTime(),
      new Date(2024, 7, 14, 15).getTime()
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

watch(timestamp, (newDate) => {
  dateDiff(newDate)
  fetchDataPromise.value = fetchCard()
})

onMounted(() => {
  fetchDataPromise.value = fetchCard()
})
</script>
