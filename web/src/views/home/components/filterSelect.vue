<template>
    <div class="mr-0 bg-white flex flex-row items-center">
      <div class="w-16 h-8 flex justify-center items-center text-gray-300">{{ label }}</div>
      <n-select
        class="w-30 h-8"
        v-model="value"
        placeholder=""
        @update:value="handleUpdateValue"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    label: String,
    value: [String, Number],
    options: Array
  })
  
  const emit = defineEmits(['update:value'])
  
  const handleUpdateValue = (newValue) => {
    emit('update:value', newValue)
  }
  </script>