<template>
  <n-layout has-sider>
    <n-layout-sider :native-scrollbar="false" has-sider class="h-full">
      <n-menu
        class="w-60 h-full fixed top-14"
        :options="menuOptions"
        @update:value="handleMenuSelect"
        :value="menuStore.activeKey"
      />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'

const menuStore = useMenuStore()

const handleMenuSelect = (key: string) => {
  menuStore.setActiveKey(key)
}

const menuOptions = ref([
  {
    label: '概览',
    key: 'overAll'
  },
  {
    label: '健康状况',
    key: 'health'
  },
  {
    label: '性能预览',
    key: 'performance'
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
