<template>
  <div class="w-full flex-grow bg-gray-100 relative">
    <div class="mt-3 h-74 bg-white rounded-lg mx-5">
      <div class="border-b-2 border-b-black-500 h-10">
        <div
          v-for="item in barItems"
          :class="[
            'inline-block text-lg text-center cursor-pointer mt-2 mr-12 ml-3 relative',
            { 'text-orange-500 active-tab': item.key === activeKey }
          ]"
          @click="handleMenuChange(item.key, $event)"
        >
          {{ item.label }}
        </div>
        <span
          ref="indicatorRef"
          class="absolute top-[50px] left-0 h-1 bg-orange-500"
          style="
            transition:
              left 0.3s ease,
              width 0.3s ease;
          "
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const indicatorRef = ref<HTMLElement | null>(null)

const activeKey = ref('over')

const barItems = ref([
  {
    key: 'over',
    label: '概览'
  },
  {
    key: 'errorList',
    label: '错误列表'
  },
  {
    key: 'version',
    label: '版本分析'
  },
  {
    key: 'waitError',
    label: '待处理错误'
  },
  {
    key: 'dealOverview',
    label: '处理概览'
  }
])

const updateIndicatorPosition = (element) => {
  const rect = element.getBoundingClientRect()
  const parentRect = element.parentElement.getBoundingClientRect()
  const newLeft = rect.left - parentRect.left
  if (indicatorRef.value) {
  indicatorRef.value.style.left = `${newLeft + 20}px`
  indicatorRef.value.style.width = `${rect.width}px`
  }
}

const handleMenuChange = (key, event) => {
  activeKey.value = key
  updateIndicatorPosition(event.target)
}

onMounted(async () => {
  activeKey.value = barItems.value[0].key
  await nextTick()
  const defaultTab = document.querySelector('.active-tab')
  if (defaultTab && indicatorRef.value) {
    indicatorRef.value.style.transition = 'none'
    updateIndicatorPosition(defaultTab)
    indicatorRef.value.style.transition = 'left 0.3s ease, width 0.3s ease'
    console.log('defaultTab:', indicatorRef.value)
  }
})
</script>
