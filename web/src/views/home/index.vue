<template>
  <div class="w-full flex-grow bg-gray-100">
    <div class="h-14 mx-5 flex items-center justify-between">
      <n-button class="ml-5 h-8" color="#ff7626">创建应用</n-button>
      <div class="h-full w-210 ml-45 flex justify-around items-center">
        <div class="mr-0 bg-white flex flex-row items-center">
          <div class="w-16 h-8 flex justify-center items-center text-gray-300">环境</div>
          <n-select
            class="w-30 h-8"
            v-model="value"
            placeholder=""
            :options="envOptions"
            @update:value="handleUpdateValue"
          />
        </div>
        <div class="mr-0 bg-white flex flex-row items-center">
          <div class="w-16 h-8 flex justify-center items-center text-gray-300">团队列表</div>
          <n-select
            class="w-30 h-8"
            v-model="value"
            placeholder=""
            :options="envOptions"
            @update:value="handleUpdateValue"
          />
        </div>
        <div class="mr-0 bg-white flex flex-row items-center">
          <div class="w-16 h-8 flex justify-center items-center text-gray-300">应用类型</div>
          <n-select
            class="w-30 h-8"
            v-model="value"
            placeholder=""
            :options="envOptions"
            @update:value="handleUpdateValue"
          />
        </div>
        <div class="mr-0 bg-white flex flex-row items-center">
          <div class="w-16 h-8 flex justify-center items-center text-gray-300">应用状态</div>
          <n-select
            class="w-30 h-8"
            v-model="value"
            placeholder=""
            :options="envOptions"
            @update:value="handleUpdateValue"
          />
        </div>
      </div>
      <div>
        <n-input v-model:value="serachValue" type="text" placeholder="请输入应用名称" />
      </div>
    </div>
    <main class="flex flex-wrap justify-around p-1 mt-1.5">
      <projectCard
        v-for="(project, index) in projects"
        :key="'large' + index"
        :project="project"
        :fetchDataPromise="fetchDataPromise"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import {
  getDetailData,
  getProjectInfoListInRealTime,
  getAliveCusInRealTime,
  getProjectInfoInRealTime
} from '@/api/home'
import router from '@/routers/index'
import projectCard from './components/projectCard.vue.vue'

const serachValue = ref('')
const projects = ref<Project[]>([])
const projectNums = ref<ProjectNums[]>([])
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
const envValue = ref('')
const teamValue = ref('')
const appTypeValue = ref('')
const appStatusValue = ref('')

const envOptions = []
const teamOptions = []
const appTypeOptions = []
const appStatusOptions = []

interface Project {
  webMonitorId: string
  projectName: string
  jsErrorPer?: string
  consoleErrorPer?: string
  apiErrorPer?: string
  resourceErrorPer?: string
  customerLeaveRate?: number
  httpSecondOpenRate?: number
  pageSecondOpenRate?: number
  todayUvCount?: number
  uvNum?: string
  newUvNum?: string
  aliveNum?: number
}

interface ProjectNums {
  webMonitorId: string
  count: number
}

const fetchDataPromise = ref<Promise<unknown> | undefined>(undefined)

const fetchData = async () => {
  try {
    const params = {
      page: '0',
      pageSize: 'all',
      env: 'all',
      projectName: '',
      sort: 'uvDesc',
      teamId: 'all',
      type: '1'
    }
    const responseList = await getProjectInfoListInRealTime(params)
    projects.value = responseList.data
    projects.value = await Promise.all(
      responseList.data.map(async (project) => {
        const userResponse = await getProjectInfoInRealTime(project.webMonitorId)
        const params = {
          timeSize: 0,
          webMonitorId: project.webMonitorId
        }
        const detailResponse = await getDetailData(params)
        const {
          customerLeaveRate,
          httpErrorTotalCount,
          httpSecondOpenRate,
          jsConsoleErrorTotalCount,
          jsErrorTotalCount,
          pageSecondOpenRate,
          resourceErrorTotalCount,
          todayUvCount
        } = detailResponse.data
        const { uv, newCus } = userResponse.data
        const updatedProject = {
          ...project,
          jsErrorPer: ((jsErrorTotalCount / todayUvCount) * 100).toFixed(2),
          consoleErrorPer: ((jsConsoleErrorTotalCount / todayUvCount) * 100).toFixed(2),
          apiErrorPer: ((httpErrorTotalCount / todayUvCount) * 100).toFixed(2),
          resourceErrorPer: ((resourceErrorTotalCount / todayUvCount) * 100).toFixed(2),
          customerLeaveRate,
          httpSecondOpenRate,
          pageSecondOpenRate,
          todayUvCount,
          uvNum: (uv / 10000).toFixed(1),
          newUvNum: (newCus / 10000).toFixed(1)
        }
        return updatedProject
      })
    )
  } catch (error) {
    console.log(error)
  }
}

const handleClick = () => {
  router.push({ name: 'overView' })
}

const fetchNum = async () => {
  const params = {
    webMonitorIdList: [
      'webfunny_120',
      'webfunny_121',
      'webfunny_122',
      'webfunny_123',
      'webfunny_124',
      'webfunny_125',
      'webfunny_126',
      'webfunny_127',
      'webfunny_128'
    ],
    webMonitorId: '1'
  }
  const responseNumList = await getAliveCusInRealTime(params)
  projectNums.value = responseNumList.data
  projects.value = projects.value.map((project) => {
    const projectNum = projectNums.value.find((p) => p.webMonitorId === project.webMonitorId)
    if (projectNum === undefined) {
      console.log('projectNum is undefined', project.aliveNum)
      project.aliveNum = 0
    } else {
      console.log('projectNum is undefined', project.aliveNum)
      project.aliveNum = projectNum.count
    }
    return project
  })
}

onMounted(() => {
  fetchDataPromise.value = fetchData().then(() => fetchNum())
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>
