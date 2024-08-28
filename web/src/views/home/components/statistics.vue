<template>
  <div class="rounded-xl flex justify-around mx-2 my-2 bg-white h-21">
    <div class="bg-white w-1/3 h-full flex flex-col">
      <div class="text-ssm flex justify-center h-5 mt-3">活跃用户数</div>
      <div class="flex w-full justify-center mt-1">
        <scrollNumber
          v-if="project?.aliveNum !== undefined"
          :value="project?.aliveNum"
          :fetchDataPromise="fetchDataPromise"
        ></scrollNumber>
      </div>
    </div>
    <div class="w-1/3 h-full">
      <div class="text-ssm flex justify-center h-5 mt-3">用户总数</div>
      <div class="flex w-full justify-center mt-1 text-lg font-bold">
        {{ project?.uvNum !== undefined ? project.uvNum + '万' : '' }}
      </div>
    </div>
    <div class="bg-white w-1/3 h-full">
      <div class="text-ssm flex justify-center h-5 mt-3">新用户数</div>
      <div class="flex w-full justify-center mt-1 text-lg font-bold">
        {{ project?.newUvNum !== undefined ? project.newUvNum + '万' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import scrollNumber from '@/components/scrollNumber.vue'

const props = defineProps({
  project: Object,
  fetchDataPromise: Promise
})
</script>
