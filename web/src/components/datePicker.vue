<template>
<n-date-picker v-model:value="range" type="daterange" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'

const range = ref<[number, number]>([1723135260000, Date.now()])
const labels = ref<string[]>([])

const generateLabels = (start: number, end: number) => {
  const labelList: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  while (startDate <= endDate) {
    labelList.push(format(startDate, 'MM-dd'))
    startDate.setDate(startDate.getDate() + 1)
  }
  return labelList
}
const startDate = format(new Date(range.value[0]), 'yyyy-MM-dd')
const endDate = format(new Date(range.value[1]), 'yyyy-MM-dd')
labels.value = generateLabels(range.value[0], range.value[1])
</script>