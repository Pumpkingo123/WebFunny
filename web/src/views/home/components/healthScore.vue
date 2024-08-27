<template>
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
            <div class="flex w-full text-ssm">js报错率 {{ project?.jsErrorPer }}%</div>
            <div class="flex w-full text-ssm">自定义异常率 {{ project?.consoleErrorPer }}%</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex w-full text-ssm">接口报错率 {{ project?.apiErrorPer }}%</div>
            <div class="flex w-full text-ssm">
              静态资源报错率 {{ project?.resourceErrorPer }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { ApertureOutline } from '@vicons/ionicons5'
  
  const props = defineProps({
    project: Object
  })
  </script>