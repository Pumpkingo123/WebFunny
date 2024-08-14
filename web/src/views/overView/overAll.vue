<template>
  <div class="h-12 w-full flex items-center pl-8 text-xl flex justify-between">
    核心数据
    <div class="mr-5"><n-date-picker v-model:value="timestamp" type="date" /></div>
  </div>
  <div class="h-40 mx-4 mt-4 bg-white rounded-lg">
    <div class="h-12 ml-2 flex items-center text-lg ">流量数据</div>
    <div class="flex flex-row h-28 w-full justify-between">
  <div class="w-1/5 flex flex-col">
    <div class="h-8 w-full mt-2 text-center leading-8">浏览量(PV)</div>
    <div class="h-10 w-full leading-10 text-xl text-center">{{PVnum}}</div>
    <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
  </div>
  <div class="w-1/5 flex flex-col">
    <div class="h-8 w-full mt-2 text-center leading-8">访客数(UV)</div>
    <div class="h-10 w-full leading-10 text-xl text-center">{{UVnum}}</div>
    <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
  </div>
  <div class="w-1/5 flex flex-col">
    <div class="h-8 w-full mt-2 text-center leading-8">新访客</div>
    <div class="h-10 w-full leading-10 text-xl text-center">{{newUV}}</div>
    <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
  </div>
  <div class="w-1/5 flex flex-col">
    <div class="h-8 w-full mt-2 text-center leading-8">IP数</div>
    <div class="h-10 w-full leading-10 text-xl text-center">{{IPnum}}</div>
    <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
  </div>
  <div class="w-1/5 flex flex-col">
    <div class="h-8 w-full mt-2 text-center leading-8">跳出率</div>
    <div class="h-10 w-full leading-10 text-xl text-center">{{bounceRate}}</div>
    <div class="h-4 w-full text-ssm leading-4 text-center">较昨日</div>
  </div>
</div>
  </div>
  <div class="h-50 mx-4 mt-4 bg-white rounded-lg"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue' 
import overView from '@/api/overView'

const PVnum = ref(0)
const UVnum = ref(0)
const newUV = ref(0)
const IPnum = ref(0)
const bounceRate = ref(0)
const timestamp = ref(Date.now())

const fetchData = async () => {
  try {
    const over = new overView()
    const response = await over.getOverData()
    const { todatPvData, todatUvData, todeayNewUvData, todayIpData, todayCusLeavePercentData } = response.data
    console.log(response.data)
    PVnum.value = todatPvData
    UVnum.value = todatUvData
    newUV.value = todeayNewUvData
    IPnum.value = todayIpData
    bounceRate.value = todayCusLeavePercentData
  } catch (error) {
    console.error('1111', error)
  }
}

onMounted(() => {
  fetchData()
})

</script>
