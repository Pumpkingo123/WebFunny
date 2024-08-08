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
		<n-input v-model:value="value" type="text" placeholder="请输入应用名称" />
	</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  console.log('111111111')
})

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
