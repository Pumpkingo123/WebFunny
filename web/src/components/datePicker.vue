<template>
    <n-date-picker v-model:value="timestamp" type="date" @update:value="updateDateLabel" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['update:timestamp'])

const timestamp = ref<number>(new Date().getTime())

const updateDateLabel = () => {
  emit('update:timestamp', timestamp.value)
}

watch(timestamp, updateDateLabel, { immediate: true })

</script>