<template>
  <div>
    <div
      v-for="item in barItems"
      :key="item.key"
      :class="[
        'inline-block text-lg h-10 text-center cursor-pointer mt-2 mr-12 ml-3 relative',
        { 'text-orange-500 active-tab': item.key === activeKey }
      ]"
      @click="handleMenuChange(item.key, $event)"
      ref="menuItems"
    >
      {{ item.label }}
    </div>
    <span
      ref="indicatorRef"
      class="absolute top-13.5 left-0 h-1 bg-orange-500"
      style="
        transition:
          left 0.3s ease,
          width 0.3s ease;
      "
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch, nextTick } from 'vue'

const menuItems = ref<HTMLElement[]>([])
const indicatorRef = ref<HTMLElement | null>(null)

const props = defineProps<{
  barItems: { key: string; label: string }[]
  activeKey: string
}>()

const emit = defineEmits<{
  (e: 'menuChange', key: string, event: Event): void
}>()

const handleMenuChange = (key: string, event: Event) => {
  emit('menuChange', key, event)
  updateIndicatorPosition(event.target as HTMLElement)
}

const updateIndicatorPosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const parentRect = element.parentElement!.getBoundingClientRect()
  const newLeft = rect.left - parentRect.left
  if (indicatorRef.value) {
    indicatorRef.value.style.left = `${newLeft+20}px`
    indicatorRef.value.style.width = `${rect.width}px`
  }
}

onMounted(async () => {
  await nextTick()
  if (menuItems.value.length > 0) {
    const firstItem = menuItems.value[0]
    updateIndicatorPosition(firstItem)
  }
})

watch(
  () => props.activeKey,
  (newKey) => {
    const activeItem = menuItems.value.find((item) => item.key === newKey)
    if (activeItem) {
      updateIndicatorPosition(menuItems.value[0])
    }
  }
)
</script>