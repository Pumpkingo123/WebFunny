<template>
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
            <div class="flex w-full text-ssm">页面秒开率 {{ project?.pageSecondOpenRate }}%</div>
            <div class="flex w-full text-ssm">页面跳出率 {{ project?.customerLeaveRate }}%</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex w-full text-ssm">接口秒开率 {{ project?.httpSecondOpenRate }}%</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  import { BonfireOutline } from '@vicons/ionicons5'
  
  const props = defineProps({
    project: Object
  })
  </script>