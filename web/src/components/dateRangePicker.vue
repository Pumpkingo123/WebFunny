<template>
  <n-date-picker
    v-model:value="range"
    type="daterange"
    clearable
    @update:value="updateRangeLabel"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { defineEmits } from 'vue'
import { generateLabels } from '@/utils/generateLabels'

const emit = defineEmits(['update:rangeLabel', 'update:range'])
const range = ref<[number, number]>([1723135260000, Date.now()])
const labels = ref<string[]>([])

labels.value = generateLabels(range.value[0], range.value[1])

const rangeLabel = computed(() => {
  const startDate = new Date(range.value[0])
  const endDate = new Date(range.value[1])
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return `${diffDays}天`
})

const updateRangeLabel = () => {
  emit('update:rangeLabel', rangeLabel.value)
  emit('update:range', range.value)
}

watch(range, updateRangeLabel, { immediate: true })
</script>
