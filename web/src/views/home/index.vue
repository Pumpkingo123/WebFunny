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
      <div
        class="mx-5 rounded-2xl w-1/4 h-81 bg-rice mt-5"
        v-for="(project, index) in projects"
        :key="'large' + index"
      >
        <div class="w-full flex justify-between h-10 mb-[3px]">
          <div class="ml-2 w-28 mt-1 flex items-center">{{ project.projectName }}</div>
          <div class="mr-2 w-12 mt-1 flex justify-between items-center">
            <n-icon size="20" color="#828594">
              <BookmarksOutline />
            </n-icon>
            <n-icon size="20" color="#828594">
              <SettingsOutline />
            </n-icon>
          </div>
        </div>
        <div class="rounded-xl flex justify-around mx-2 my-2 bg-white h-21">
          <div class="bg-white w-1/3 h-full flex flex-col">
            <div class="text-ssm flex justify-center h-5 mt-3">活跃用户数</div>
            <div class="flex w-full justify-center mt-1">
              <scrollNumber :value="project.aliveNum"></scrollNumber>
            </div>
          </div>
          <div class="w-1/3 h-full">
            <div class="text-ssm flex justify-center h-5 mt-3">用户总数</div>
            <div class="flex w-full justify-center mt-1 text-lg font-bold">
              {{ project.uvNum }}万
            </div>
          </div>
          <div class="bg-white w-1/3 h-full">
            <div class="text-ssm flex justify-center h-5 mt-3">新用户数</div>
            <div class="flex w-full justify-center mt-1 text-lg font-bold">
              {{ project.newUvNum }}万
            </div>
          </div>
        </div>
        <div class="rounded-xl mx-2 my-2 bg-white h-21 flex flex-row">
          <div class="w-25 h-full ml-2 flex items-center justify-center">
            <n-progress
              type="dashboard"
              style="width: 70px"
              gap-position="bottom"
              color="#fdad45"
              :stroke-width="6"
            >
              <div style="text-align: center; font-size: 13px; margin-top: 25px; width: 40px">
                <n-icon size="30" color="#fdad45">
                  <ApertureOutline />
                </n-icon>
                健康
              </div>
            </n-progress>
          </div>
          <div class="w-full ml-3 flex-col h-full flex">
            <div class="w-full flex h-10 leading-10 justify-center text-lg font-bold">健康分</div>
            <div class="w-full flex h-full flex-col">
              <div class="flex flex-row justify-between">
                <div class="flex w-full text-ssm">js报错率 {{ project.jsErrorPer }}%</div>
                <div class="flex w-full text-ssm">自定义异常率 {{ project.consoleErrorPer }}%</div>
              </div>
              <div class="flex flex-row justify-between">
                <div class="flex w-full text-ssm">接口报错率 {{ project.apiErrorPer }}%</div>
                <div class="flex w-full text-ssm">
                  静态资源报错率 {{ project.resourceErrorPer }}%
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div class="rounded-xl mx-2 my-1 flex flex-row bg-white h-21">
          <div class="w-25 h-full ml-2 flex items-center justify-center">
            <n-progress
              type="dashboard"
              style="width: 70px"
              gap-position="bottom"
              color="#fe6860"
              :stroke-width="6"
            >
              <div style="text-align: center; font-size: 13px; margin-top: 25px; width: 40px">
                <n-icon size="30" color="#fe6860">
                  <BonfireOutline />
                </n-icon>
                性能
              </div>
            </n-progress>
          </div>
          <div class="w-full ml-3 flex-col h-full flex">
            <div class="w-full flex h-10 leading-10 justify-center text-lg font-bold">性能分</div>
            <div class="w-full flex h-full flex-col">
              <div class="flex flex-row justify-between">
                <div class="flex w-full text-ssm">页面秒开率 {{ project.pageSecondOpenRate }}%</div>
                <div class="flex w-full text-ssm">页面跳出率 {{ project.customerLeaveRate }}%</div>
              </div>
              <div class="flex flex-row justify-between">
                <div class="flex w-full text-ssm">接口秒开率 {{ project.httpSecondOpenRate }}%</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
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
import {
  SettingsOutline,
  BookmarksOutline,
  ApertureOutline,
  BonfireOutline
} from '@vicons/ionicons5'
import scrollNumber from '@/components/scrollNumber.vue'

const serachValue = ref('')
const projects = ref<Project[]>([])
const projectNums = ref<ProjectNums[]>([])
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

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
    if (projectNum) {
      project.aliveNum = projectNum.count
    }
    return project
  })
}

onMounted(() => {
  fetchData()
  fetchNum()
  // intervalId.value = setInterval(fetchNum, 4000)
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>
