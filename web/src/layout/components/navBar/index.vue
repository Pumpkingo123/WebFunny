<template>
  <n-layout has-sider>
    <n-layout-sider :native-scrollbar="false" has-sider class="h-full">
      <n-menu
        class="w-60 h-full fixed top-14"
        :options="menuOptionsRef"
        @update:value="handleMenuSelect"
        :value="menuStore.activeKey"
      />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { menuOptions } from '@/config/navConfig'

const menuStore = useMenuStore()

const handleMenuSelect = (key: string) => {
  menuStore.setActiveKey(key)
}

const menuOptionsRef = ref(menuOptions)
</script>

<style scoped>
.n-menu :v-deep .n-menu-item {
  @apply h-12 leading-12 text-base;
}
</style>
