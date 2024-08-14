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
      <div class="mx-5 rounded-2xl w-1/4 h-81 bg-rice mt-5" v-for="i in 9" :key="'large' + i">
        <div class="w-full flex justify-between h-10 mb-[3px]">
          <div class="ml-[3px] w-2 mt-1 items-center"></div>
          <div class="mr-[3px] w-[15px] mt-1 flex justify-between items-center"></div>
        </div>
        <div class="rounded-xl flex justify-between mx-2 my-2 bg-white h-21"></div>
        <div class="rounded-xl flex-col mx-2 my-2 bg-white h-21"></div>
        <div class="rounded-xl flex-col mx-2 my-1 bg-white h-21"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const handleUpdateValue = ref('all')

const envOptions: MenuOption[] = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: 'dev',
    value: 'dev'
  }
]
</script>
