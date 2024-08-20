<template>
  <div class="flex">
    <div v-for="(item, index) in numberList" :key="index" class="flex w-5">
      <span v-if="isNaN(item)">{{ item }}</span>
      <div class="number">
        <span
          class="number-item text-xl text-yellow font-bold"
          ref="numberItem"
          :data-number="item"
          :data-index="index"
        >
          0123456879
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'

interface Props {
  value: string | number
}

const props = defineProps<Props>()

const numberItem = ref<HTMLElement[]>([])
const numberList = computed(() => String(props.value).split(''))

const setNumberTransform = () => {
  const numberItems = numberItem.value
  const obj: { [key: string]: ReturnType<typeof setInterval> | null } = {}
  numberItems.forEach((c) => {
    const key = c.dataset.index!
    const value = c.dataset.number!
    let init = 0
    obj[key] = setInterval(() => {
      if (init < parseInt(value, 10) * 10) {
        // 确保 parseInt 使用基数 10
        init += 1
        c.style.transform = `translateY(-${init}%)`
      } else {
        clearInterval(obj[key]!)
        obj[key] = null
      }
    }, 20)
  })
}

watch(
  () => props.value,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        setNumberTransform()
      })
    }
  }
)

onMounted(() => {
  setNumberTransform()
})
</script>

<style scoped>
.number {
  @apply w-5 h-7 overflow-hidden;
  > span {
    writing-mode: vertical-rl;
    text-orientation: upright;
    transform: translateY(0%);
    width: 29px;
  }
}
</style>
