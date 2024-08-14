<template>
  <div class="ml-60 bg-gray-100">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import health from '@/views/overView/health.vue'
import location from '@/views/overView/location.vue'
import overAll from '@/views/overView/overAll.vue'
import performance from '@/views/overView/performance.vue'

const menuStore = useMenuStore()

const componentsMap = {
  health,
  location,
  overAll,
  performance
}

const currentComponent = computed(() => {
  return componentsMap[menuStore.activeKey || 'overall']
})
</script>
