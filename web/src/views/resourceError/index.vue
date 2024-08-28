<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 bg-white rounded-lg mx-5 h-80 flex flex-col">
      <div class="h-15 w-full border-solid border-b-2 flex">
        <div class="self-end ml-4 text-base flex-col relative w-55vw">
          <div class="mb-1 w-25 text-purple-500">资源加载报错</div>
          <span class="absolute bottom-[-1] left-0 w-25 h-1 bg-purple-500"></span>
        </div>
        <div class="self-end ml-4 text-base flex-col relative">
          <div class="mb-1 text-purple-500">今日概况</div>
          <span class="absolute bottom-[-1] left-0 w-full h-1 bg-purple-500"></span>
        </div>
      </div>
      <div class="w-full h-full flex gap-5 justify-between">
        <div style="height: 15rem; width: 55vw; background-color: white; margin-top: 1rem">
          <chart
            :labels="labels"
            :barData=[resourceErrorData]
            :name="'allCount'"
            :yAxisIDBar="'y1'"
            :fetchDataPromise="fetchDataPromise"
            :chartColors="{
              barCol1: '#5d5cb6'
            }"
            :chartLabels="{
              barDes1: 'Error发生错误次数'
            }"
            chartType="bar"
          />
        </div>
        <div class="h-full w-40vw flex flex-wrap">
          <card :icon="AlbumsSharp" title="总发生次数" :value="totals.count" unit="次" />
          <card :icon="Bookmarks" title="影响页面次数" :value="totals.count" unit="次" />
          <card :icon="ManSharp" title="影响用户数" :value="totals.customerCount" unit="位" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getResourceLoadInfoListByDay, getResourceErrorCountByDay } from '@/api/resourceError'
import Chart from '@/components/chart.vue'
import { formatData } from '@/utils/formatData'
import { generateLabels } from '@/utils/generateLabels'
import { AlbumsSharp, Bookmarks, ManSharp } from '@vicons/ionicons5'
import card from './components/card.vue'

const labels = ref<string[]>([])
const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)
const resourceErrorData = ref<number[]>([])
const LoadData = ref<{ count: number; customerCount: number }[]>([])

const fetchData = async () => {
  const params = {
    timeType: 0,
    webMonitorId: '1'
  }
  const res = await getResourceErrorCountByDay(params.webMonitorId)
  const response = await getResourceLoadInfoListByDay(params)
  LoadData.value = response.data.map((item: { count: number; customerCount: number }) => ({
    count: item.count,
    customerCount: item.customerCount
  }))
  console.log('222', LoadData.value)
  labels.value = generateLabels(1704211200000, 1706630400000)
  resourceErrorData.value = formatData(res.data, labels.value, 'day')
}

const totals = computed(() => {
  return LoadData.value.reduce(
    (acc, item) => {
      acc.count += Number(item.count)
      acc.customerCount += Number(item.customerCount)
      return acc
    },
    { count: 0, customerCount: 0 }
  )
})

onMounted(() => {
  fetchDataPromise.value = fetchData()
})
</script>
