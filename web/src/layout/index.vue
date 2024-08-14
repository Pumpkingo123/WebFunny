<template>
  <n-layout class="flex flex-col h-100vh">
    <PageHeader />
    <navBar v-if="showSidebar" />
    <router-view class="h-full router-view-height overflow-auto" />
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PageHeader } from './components/header/index'
import { navBar } from './components/navBar/index'
import { useRoute } from 'vue-router'

const route = useRoute()

const showSidebar = computed(() => route.name === 'overView')
</script>

<style scoped>
.router-view-height {
  height: calc(100vh - 3.5rem);
}
</style>
