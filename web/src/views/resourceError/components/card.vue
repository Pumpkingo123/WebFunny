<template>
    <div class="w-1/2 h-1/2 flex flex-col justify-center items-center text-gray-500">
      <component :is="icon" class="w-13"/>
      <div>{{ title }}</div>
      {{ value }}{{ unit }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps({
    icon: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    unit: {
      type: String,
      default: ''
    }
  })
  </script>