<template>
  <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
    核心数据
    <div class="mr-5"><n-date-picker v-model:value="timestamp" type="date" /></div>
  </div>
  <n-spin :show="show" size="large">
    <template #description>
      <div class="text-lg">加载中</div>
    </template>
    <div class="h-40 mx-4 mt-4 bg-white rounded-lg">
      <div class="h-12 ml-2 flex items-center text-lg">流量数据</div>
      <div class="flex flex-row h-28 w-full justify-between">
        <div class="w-1/5 flex flex-col">
          <div class="h-8 w-full mt-2 text-center leading-8">浏览量(PV)</div>
          <div class="h-10 w-full leading-10 text-xl text-center">{{ PVnum }}</div>
          <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
        </div>
        <div class="w-1/5 flex flex-col">
          <div class="h-8 w-full mt-2 text-center leading-8">访客数(UV)</div>
          <div class="h-10 w-full leading-10 text-xl text-center">{{ UVnum }}</div>
          <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
        </div>
        <div class="w-1/5 flex flex-col">
          <div class="h-8 w-full mt-2 text-center leading-8">新访客</div>
          <div class="h-10 w-full leading-10 text-xl text-center">{{ newUV }}</div>
          <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
        </div>
        <div class="w-1/5 flex flex-col">
          <div class="h-8 w-full mt-2 text-center leading-8">IP数</div>
          <div class="h-10 w-full leading-10 text-xl text-center">{{ IPnum }}</div>
          <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
        </div>
        <div class="w-1/5 flex flex-col">
          <div class="h-8 w-full mt-2 text-center leading-8">跳出率</div>
          <div class="h-10 w-full leading-10 text-xl text-center">{{ bounceRate }}%</div>
          <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
        </div>
      </div>
    </div>

    <div class="h-60 mx-4 mt-4 bg-white rounded-lg">
      <div class="w-full h-10 ml-3 pt-2 flex flex-row">
        <div class="text-base mt-5">用户量统计</div>
        <div class="w-30 h-7 mt-4 ml-4 flex flex-row">
          <n-button
            class="view"
            :class="[
              selectedButton === '30天' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
            ]"
            @click="selectButton('30天')"
          >
            30天
          </n-button>
          <n-button
            :class="[
              selectedButton === '90天' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
            ]"
            @click="selectButton('90天')"
          >
            90天
          </n-button>
          <n-button
            :class="[
              selectedButton === '半年' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
            ]"
            @click="selectButton('半年')"
          >
            半年
          </n-button>
          <n-button
            :class="[
              selectedButton === '一年' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
            ]"
            @click="selectButton('一年')"
          >
            一年
          </n-button>
        </div>
      </div>
      <chart
        class="pt-8"
        :labels="labels"
        :name="'userCount'"
        :barData="[newUVData, UVData]"
        :yAxisIDBar="'y1'"
        :range="range"
        :fetchDataPromise="fetchData1Promise"
        :chartColors="{
          barCol1: '#ff8639',
          barCol2: '#ffddc7'
        }"
        :chartLabels="{
          barDes1: '新用户数',
          barDes2: '老用户数'
        }"
        chartType="bar"
      />
    </div>
  </n-spin>
  <div class="h-160 flex flex-row flex-wrap justify-between mt-14 rounded-lg mx-4 mb-10">
    <Card
      class="mr-4"
      title="页面访问量趋势"
      name="userCount1"
      :labels="labels2"
      :lineData="[PvCount, PvCount7]"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchData2Promise"
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
      title="用户活跃量趋势"
      name="userCount2"
      :labels="labels2"
      :lineData="[UvCount, UvCount7]"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchData2Promise"
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
      title="新用户活跃量趋势"
      name="userCount3"
      :labels="labels2"
      :lineData="[NewCustomerCount, NewCustomerCount7]"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchData2Promise"
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
      title="跳出率趋势"
      name="userCount4"
      :labels="labels2"
      :lineData="[CusLeavePercent, CusLeavePercent7]"
      yAxisIDLine="y1"
      :fetchDataPromise="fetchData2Promise"
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
  getOverData,
  getUvCountMonth,
  getPvCountByHour,
  getNewCustomerCountByHour,
  getUvCountByHour,
  getCusLeavePercentByHour
} from '@/api/overView'
import { subDays } from 'date-fns'
import { formatData } from '@/utils/formatData'
import { generateLabels } from '@/utils/generateLabels'
import Chart from '@/components/chart.vue'
import Card from '@/views/overView/components/card.vue'

const PVnum = ref(0)
const UVnum = ref(0)
const newUV = ref(0)
const IPnum = ref(0)
const bounceRate = ref(0)
const timeSize = ref<number>(0)
const range = ref<number[]>([0, Date.now()])
const timestamp = ref(Date.now())
const show = ref(true)
const newUVData = ref<number[]>([])
const PvCount = ref<number[]>([])
const PvCount7 = ref<number[]>([])
const UvCount = ref<number[]>([])
const UvCount7 = ref<number[]>([])
const NewCustomerCount = ref<number[]>([])
const NewCustomerCount7 = ref<number[]>([])
const CusLeavePercent = ref<number[]>([])
const CusLeavePercent7 = ref<number[]>([])
const UVData = ref<number[]>([])
const labels = ref<string[]>([])
const labels2 = ref<string[]>([])
const labels3 = ref<string[]>([])
const selectedButton = ref('30天')
const fetchData1Promise = ref<Promise<unknown> | undefined>(undefined)
const fetchData2Promise = ref<Promise<unknown> | undefined>(undefined)
const now = new Date()
const yesterday = subDays(now, 1)
const lastWeek = subDays(now, 7)

const selectButton = (button) => {
  selectedButton.value = button
  switch (button) {
    case '30天':
      timeSize.value = 30
      range.value = [subDays(now, 30).getTime(), now.getTime()]
      break
    case '90天':
      timeSize.value = 90
      range.value = [subDays(now, 90).getTime(), now.getTime()]
      break
    case '半年':
      timeSize.value = 180
      range.value = [subDays(now, 180).getTime(), now.getTime()]
      break
    case '一年':
      timeSize.value = 366
      range.value = [subDays(now, 366).getTime(), now.getTime()]
      break
  }
}

const fetchData = async () => {
  try {
    const params = {
      timeSize: timeSize.value,
      chooseUserTag: '',
      webMonitorId: '1'
    }
    const response = await getOverData(params)
    console.log('', response.data)
    const { todayPvData, todayUvData, todayNewData, todayIpData, todayCusLeavePercentData } =
      response.data
    PVnum.value = todayPvData[0].dayCount
    UVnum.value = todayUvData[0].dayCount
    newUV.value = todayNewData[0].dayCount
    IPnum.value = todayIpData[0].dayCount
    bounceRate.value = todayCusLeavePercentData[0].dayCount
  } catch (error) {
    console.error('1111', error)
  } finally {
    setTimeout(() => {
      show.value = false
    }, 1500)
  }
}

const fetchMonthData = async () => {
  try {
    const params = {
      chooseUserTag: '',
      timeSize: timeSize.value,
      webMonitorId: '1'
    }
    const responseMon = await getUvCountMonth(params)
    const { uvData, newUvData } = responseMon.data
    labels.value = generateLabels(subDays(now, 29).getTime(), now.getTime())
    newUVData.value = formatData(newUvData, labels.value, 'day')
    UVData.value = formatData(uvData, labels.value, 'day')
  } catch (error) {
    console.error('111', error)
  }
}

const fetchHourData = async () => {
  try {
    const params = { timeSize: 0, chooseUserTag: '', scope: 7, webMonitorId: '1' }
    const [pvData, newCustomerData, uvData, leaveData] = await Promise.all([
      getPvCountByHour(params),
      getNewCustomerCountByHour(params),
      getUvCountByHour(params),
      getCusLeavePercentByHour(params)
    ])
    console.log('pvData', pvData)
    const { today: pvToday, seven: pvSeven } = pvData.data
    const { today: newCustomerToday, seven: newCustomerSeven } = newCustomerData.data
    const { today: uvToday, seven: uvSeven } = uvData.data
    const { today: leaveToday, seven: leaveSeven } = leaveData.data
    labels2.value = generateLabels(
      new Date(yesterday.setHours(now.getHours() + 1)).getTime(),
      new Date(now.setHours(now.getHours() - 1)).getTime(),
      'MM-dd HH',
      'hour'
    )
    labels3.value = generateLabels(
      new Date(subDays(lastWeek, 1).setHours(now.getHours() + 2)).getTime(),
      new Date(lastWeek.setHours(now.getHours() - 1)).getTime(),
      'MM-dd HH',
      'hour'
    )
    PvCount.value = formatData(pvToday, labels2.value, 'hour')
    PvCount7.value = formatData(pvSeven, labels3.value, 'hour')
    UvCount.value = formatData(uvToday, labels2.value, 'hour')
    UvCount7.value = formatData(uvSeven, labels3.value, 'hour')
    NewCustomerCount.value = formatData(newCustomerToday, labels2.value, 'hour')
    NewCustomerCount7.value = formatData(newCustomerSeven, labels3.value, 'hour')
    CusLeavePercent.value = formatData(leaveToday, labels2.value, 'hour')
    CusLeavePercent7.value = formatData(leaveSeven, labels3.value, 'hour')
  } catch (error) {
    console.error('111', error)
  }
}

watch(range, () => {
  fetchData1Promise.value = fetchMonthData()
  fetchData2Promise.value = fetchHourData()
})

onMounted(async () => {
  fetchData()
  fetchData1Promise.value = fetchMonthData()
  fetchData2Promise.value = fetchHourData()
})
</script>

<style scoped>
.n-button:hover,
.n-button:focus {
  background-color: #ff7626;
  color: #fff;
  border-color: #ff7626;
}

</style>
