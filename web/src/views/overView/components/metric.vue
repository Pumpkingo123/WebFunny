<template>
  <div class="bg-white h-full w-1/3 rounded-lg flex flex-col">
    <div class="h-1/2 w-full flex pl-8 text-lg items-center">{{ props.title }}</div>
    <div class="h-1/2 w-full text-2xl font-bold pl-8">{{ props.value }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})
</script>
