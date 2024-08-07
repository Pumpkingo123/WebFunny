<template>
  <n-layout class="h-100vh">
    <PageHeader />
    <navBar v-if="showSidebar" />    
      <router-view class="mt-14" />
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