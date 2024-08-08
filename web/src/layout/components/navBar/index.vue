<template>
  <n-layout has-sider>
    <n-layout-sider :native-scrollbar="false" has-sider class="h-full">
      <n-menu
        class="w-60 h-full fixed top-14"
        :options="menuOptions"
        @update:value="handleMenuSelect"
        v-model:value="activeKey"
      />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeKey = ref(localStorage.getItem('activeKey') || 'over_view')

onMounted(() => {
  if (activeKey.value === null) {
    activeKey.value = 'over_view'
    localStorage.setItem('activeKey', 'over_view')
  }
})

const handleMenuSelect = (key: string) => {
  activeKey.value = key
  localStorage.setItem('activeKey', key) // 保存到 localStorage
}

const menuOptions = ref([
  {
    label: '概览',
    key: 'over_view'
  },
  {
    label: '健康状况',
    key: 'health'
  },
  {
    label: '性能预览',
    key: 'powerOverview'
  },
  {
    label: '地域分布',
    key: 'location'
  }
])
</script>

<style scoped>
.n-menu >>> .n-menu-item {
  @apply h-12 leading-12 text-base;
}
</style>
