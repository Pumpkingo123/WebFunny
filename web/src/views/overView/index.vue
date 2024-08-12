<template>
  <div class="ml-60 bg-gray-100">
    <health v-if="menuStore.activeKey === 'health'" />
    <location v-if="menuStore.activeKey === 'location'" />
    <overAll v-if="menuStore.activeKey === 'overAll'" />
    <performance v-if="menuStore.activeKey === 'performance'" />
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import health from '@/views/overView/health.vue'
import location from '@/views/overView/location.vue'
import overAll from '@/views/overView/overAll.vue'
import performance from '@/views/overView/performance.vue'

const menuStore = useMenuStore()

</script>

