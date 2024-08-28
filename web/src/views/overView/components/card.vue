<template>
    <div class="bg-white h-70 w-85 rounded-lg">
      <div class="text-base flow leading-8 h-8 w-full ml-3">{{ props.title }}</div>
      <chart
        class="pt-1"
        :name="props.name"
        :labels="props.labels"
        :lineData="props.lineData as number[][]"
        :yAxisIDLine="props.yAxisIDLine"
        :fetchDataPromise="props.fetchDataPromise"
        :chartColors="props.chartColors"
        :chartLabels="props.chartLabels"
        :chartType="props.chartType"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue'
  
  const props = defineProps({
    title: String,
    name: String,
    labels: Array,
    lineData: Array,
    range: Number,
    yAxisIDLine: String,
    fetchDataPromise: Promise,
    chartColors: Object,
    chartLabels: Object,
    chartType: String
  })
  </script>
  