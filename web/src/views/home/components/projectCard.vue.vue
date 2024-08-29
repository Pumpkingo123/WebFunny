<template>
    <div class="mx-5 rounded-2xl w-1/4 h-81 bg-rice mt-5" @click="handleClick">
      <div class="w-full flex justify-between h-10 mb-[3px]">
        <div class="ml-2 w-28 mt-1 flex items-center">{{ project?.projectName }}</div>
        <div class="mr-2 w-12 mt-1 flex justify-between items-center">
          <n-icon size="20" color="#828594">
            <BookmarksOutline />
          </n-icon>
          <n-icon size="20" color="#828594">
            <SettingsOutline />
          </n-icon>
        </div>
      </div>
      <Statistics :project="project" />
      <HealthScore :project="project" />
      <PerformanceScore :project="project" :fetchDataPromise />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { BookmarksOutline, SettingsOutline } from '@vicons/ionicons5'
  import Statistics from './statistics.vue'
  import HealthScore from './healthScore.vue'
  import PerformanceScore from './performanceScore.vue'
  import router from '@/routers/index'
  import { useHeaderStore } from '@/stores/headerStore'

  const headerStore = useHeaderStore()
  const props = defineProps({
    project: Object,
    fetchDataPromise: Promise
  })
  
  const handleClick = () => {
    router.push({ name: 'overView' })
    headerStore.setActiveKey('overView')
  }
  </script>