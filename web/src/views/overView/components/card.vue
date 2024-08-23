<template>
    <div class="bg-white h-70 w-85 rounded-lg">
      <div class="text-base flow leading-8 h-8 w-full ml-3">{{ props.title }}</div>
      <chart
        class="pt-1"
        :name="props.name"
        :labels="props.labels"
        :range="props.range"
        :lineData1="props.lineData1"
        :lineData2="props.lineData2"
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
    lineData1: Array,
    range: Number,
    lineData2: Array,
    yAxisIDLine: String,
    fetchDataPromise: Promise,
    chartColors: Object,
    chartLabels: Object,
    chartType: String
  })
  </script>
  