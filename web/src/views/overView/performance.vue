<template>
  <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
    页面性能
    <div class="mr-5"><datePicker @update:timestamp="handleDateUpdate" /></div>
  </div>
  <div class="h-40 mx-4 mt-4 flex flex-row justify-between gap-7">
    <metric title="TTFB平均时间" :value="firstByteAvg" />
    <metric title="DOM解析时间" :value="domReadyAvg" />
    <metric title="页面平均加载时间" :value="pageCompleteLoadedAvg" />
  </div>
  <div class="h-110 mx-4 mt-4 flex flex-row justify-between gap-7">
    <div class="bg-white h-full w-1/2 rounded-lg flex flex-col">
      <div class="flex h-1/10 items-center pl-5">网络类型占比</div>
      <div class="h-9/10 w-full flex items-center justify-center">
        <doughnut
          :data="samplingPvData"
          :labels="['4g', 'unknown', '3g']"
          :colors="['#28c989', '#3695ff', '#7a79ff']"
        />
      </div>
    </div>
    <div class="bg-white h-full w-1/2 rounded-lg flex flex-col">
      <div class="flex w-full h-1/10 items-center pl-5">页面加载耗时路由Top 10</div>
      <div class="flex flex-col gap-y-4 pl-5">
        <div class="flex flex-row">
          <div class="w-1/2 font-bold">页面路由</div>
          <div class="w-1/6 pl-5 font-bold">数量</div>
          <div class="w-1/3 pl-4 font-bold flex">平均耗时</div>
        </div>
        <div v-for="(url, index) in sortedUrls" class="flex flex-row" :key="index">
          <div class="w-1/2 flex overflow-hidden text-ellipsis whitespace-nowrap">
            {{ url.simpleUrl }}
          </div>
          <div class="w-1/6 flex pl-5">{{ url.samplingPv }}</div>
          <div class="w-1/3 flex pl-5">{{ url.pageCompleteLoaded }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="font-bold pl-8 h-14 leading-14 text-lg">接口性能</div>
  <div class="h-40 mx-4 mt-4 flex flex-row justify-between gap-7">
    <metric title="接口请求总量" :value="httpLogCount" />
    <metric title="接口请求平均耗时" :value="httpLoadTime" />
    <metric title="接口请求成功率" :value="httpErrorCount" />
  </div>
  <div class="h-110 mx-4 mt-4 flex flex-row justify-between gap-7 mb-8">
    <div class="bg-white h-full w-1/2 rounded-lg flex flex-col">
      <div class="flex h-1/10 items-center pl-5">网络类型占比</div>
      <div class="h-9/10 w-full flex items-center justify-center">
        <doughnut
          :data="samplingPvData"
          :labels="['4g', 'unknown', '3g']"
          :colors="['#28c989', '#3695ff', '#7a79ff']"
        />
      </div>
    </div>
    <div class="bg-white h-full w-1/2 rounded-lg flex flex-col">
      <div class="flex w-full h-1/10 items-center pl-5">页面加载耗时路由Top 10</div>
      <div class="flex flex-col gap-y-4 pl-5">
        <div class="flex flex-row">
          <div class="w-1/2 font-bold">页面路由</div>
          <div class="w-1/6 pl-5 font-bold">数量</div>
          <div class="w-1/3 pl-4 font-bold flex">平均耗时</div>
        </div>
        <div v-for="(url, index) in sortedUrls" class="flex flex-row" :key="index">
          <div class="w-1/2 flex overflow-hidden text-ellipsis whitespace-nowrap">
            {{ url.simpleUrl }}
          </div>
          <div class="w-1/6 flex pl-5">{{ url.samplingPv }}</div>
          <div class="w-1/3 flex pl-5">{{ url.pageCompleteLoaded }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import datePicker from '@/components/datePicker.vue'
import doughnut from '@/components/doughnut.vue'
import {
  getPageLoadOverviewSimple,
  getPerfDataForUrlByDaySimple,
  getPerfInfoByNetWork,
  getHttpLoadTimeForAll
} from '@/api/performance'
import Doughnut from '@/components/doughnut.vue'
import metric from '@/views/overView/components/metric.vue'

const timestamp = ref<number>(0)
const timeSize = ref<number>(0)
const now = new Date()
const firstByteAvg = ref<string>('0')
const domReadyAvg = ref<string>('0')
const pageCompleteLoadedAvg = ref<string>('0')
const urls = ref<Url[]>([])
const samplingPvData = ref<number[]>([])
const httpErrorCount = ref<string>('0')
const httpLogCount = ref<string>('0')
const httpLoadTime = ref<string>('0')

interface Url {
  simpleUrl: string
  samplingPv: string
  pageCompleteLoaded: string
}

const handleDateUpdate = (newDate: number) => {
  timestamp.value = newDate
  now.setTime(newDate)
}

const dateDiff = (date2: number) => {
  const date1 = new Date().getTime()
  timeSize.value = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24)
}

const fetchData = async () => {
  try {
    const params = {
      timeSize: timeSize.value,
      webMonitored: '1'
    }
    const [responseLoad, responseUrl, responseInfo, responseAll] = await Promise.all([
      getPageLoadOverviewSimple(params),
      getPerfDataForUrlByDaySimple(params),
      getPerfInfoByNetWork(params),
      getHttpLoadTimeForAll(params)
    ])
    const { curr } = responseLoad.data
    const { data: responseUrlData } = responseUrl
    const { data: responseInfoData } = responseInfo
    const { data: responseAllData } = responseAll
    urls.value = responseUrlData
    firstByteAvg.value = Number(curr.firstByteAvg).toFixed(2) + 'ms'
    domReadyAvg.value = Number(curr.domReadyAvg).toFixed(2) + 'ms'
    pageCompleteLoadedAvg.value = Number(curr.pageCompleteLoadedAvg / 1000).toFixed(2) + 's'
    httpLogCount.value = Number(responseAllData.httpLogCount / 10000).toFixed(2) + '万'
    httpLoadTime.value = responseAllData.httpLogLoadTime + 'ms'
    httpErrorCount.value = Number((responseAllData.httpErrorCount / 150) * 100).toFixed(2) + '%'
    samplingPvData.value = responseInfoData.map((info: any) => Number(info.samplingPv))
    console.log('1')
  } catch (error) {
    console.log(error)
  }
}

const sortedUrls = computed(() => {
  return urls.value.slice().sort((a, b) => Number(b.samplingPv) - Number(a.samplingPv))
})

onMounted(() => {
  fetchData()
})

watch(timestamp, (newDate) => {
  dateDiff(newDate)
  fetchData()
})
</script>
