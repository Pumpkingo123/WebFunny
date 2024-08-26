<template>
  <div class="flex justify-end">
    <div class="w-35 mt-2 mr-4"><datePicker @update:timestamp="handleDateUpdate" /></div>
  </div>
  <div class="mx-4 h-15 mt-2 gap-5 flex flex-row">
    <div class="w-2/3 h-full bg-white rounded-t-lg flex flex-row justify-between">
      <div class="text-lg pl-4 pt-3">用户地域分布图</div>
      <div class="w-35 flex flex-row justify-between mr-4 mt-2">
        <n-button @click="handleClick">中国</n-button>
        <n-button @click="handleClick">全球</n-button>
      </div>
    </div>
    <div class="w-1/3 h-full bg-white rounded-t-lg pl-4 pt-3 text-lg">访问用户省份分布TOP榜</div>
  </div>
  <div class="flex flex-row mx-4 gap-5 mb-5" style="height: calc(100% - 8.5rem)">
    <div id="map" class="h-full w-2/3 bg-white rounded-b-lg"></div>
    <div class="px-3 w-1/3 bg-white rounded-b-lg overflow-y-auto">
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th class="text-center" style="width: 30%">排名</th>
            <th class="text-center" style="width: 40%">城市</th>
            <th class="text-center" style="width: 30%">用户数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">{{ item.value }}</td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getLocationDataForMap } from '@/api/location'
import datePicker from '@/components/datePicker.vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/json/china.json'
import { provinceConfig } from '@/config/provinceConfig'

const timestamp = ref<number>(0)
const timeSize = ref<number>(0)
const data = ref([])
const tableData = ref([])
const now = new Date()

const handleDateUpdate = (newDate: number) => {
  timestamp.value = newDate
  now.setTime(newDate)
}

const dateDiff = (date2: number) => {
  const date1 = new Date().getTime()
  timeSize.value = Math.floor(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24)
}

const showMap = (dataList, maxValue = 10000) => {
  let myChart = echarts.getInstanceByDom(document.getElementById('map'))
  if (!myChart) {
    myChart = echarts.init(document.getElementById('map'))
  }
  echarts.registerMap('china', mapJson)
  const option = {
    tooltip: {
      trigger: 'item', // 触发类型-数据项图形hover触发
      formatter: '{b}：{c}' // hover提示框展示的内容
    },
    visualMap: {
      orient: 'horizontal', // 显示方式-水平
      left: 'center', // 距离容器左侧的位置-居中
      min: 0, // 数据最小值
      max: maxValue, // 指定数据最大值
      itemHeight: 200, // 组件高度-200px(设置显示方式为水平之后，组件高度即为宽度)
      inRange: {
        color: ['#e9ecf0', '#ff7626'] // 范围颜色-从小到大渐变颜色区间
      },
      hoverLink: false // 是否启用数据项图形hover时的联动高亮效果。
      // text: ["高", "低"], // 组件两侧的文本
    },
    series: [
      {
        name: '中国', // 地图名称
        type: 'map', // 系列类型-地图
        map: 'china', // 地图类型-与registerMap注册地图的名字相同
        roam: false, // 是否开启鼠标缩放和平移漫游
        zoom: 1.08, // 当前视角的缩放比例
        select: {
          disabled: true // 数据项图形是否能被选中
        },
        label: {
          normal: {
            show: false // 是否在数据图形上展示省份名称
          }
        },
        data: dataList // 渲染的数据列表
      }
    ]
  }
  myChart.setOption(option)
}

const fetchMapData = async () => {
  const params = {
    timeSize: timeSize.value,
    webMonitored: '1'
  }
  const res = await getLocationDataForMap(params)
  const { provinceData, countryData } = res.data
  console.log(provinceData, countryData)
  data.value = cleanData(provinceData)
  tableData.value = provinceData.sort((a, b) => b.value - a.value)
  showMap(data.value, maxValue)
  console.log('1', data.value)
}

const cleanData = (dataList) => {
  // 去掉省、市、自治区等后缀
  const cleanedData = dataList.map((item) => {
    let name = item.name.replace(/省|市|自治区|特别行政区/g, '')
    return { ...item, name }
  })
  // 为没有数据的省份添加默认值
  const completeData = provinceConfig.map((province) => {
    const found = cleanedData.find((item) => item.name === province)
    return found ? found : { name: province, value: 0 }
  })

  return completeData
}

// 获取数据列表的最大值
const maxValue = 25000

onMounted(() => {
  fetchMapData()
})

watch(timestamp, (newDate) => {
  dateDiff(newDate)
  fetchMapData()
})
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
