<template>
    <div class="flex flex-col h-full">
      <n-progress
        :style="{ width: '100px' }"
        class="mt-16"
        :color="props.color"
        type="circle"
        :percentage="props.percentage"
      />
      <div class="flex justify-center mt-3">{{ props.label }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps({
    color: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  })
  </script>