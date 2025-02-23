<template>
  <n-layout-header class="z-10 flex justify-between has-sider h-14 sticky top-0">
    <div class="h-full w-65 flex justify-center items-center">
      <img class="h-12" src="https://www.webfunny.cn/wf_center/logos/logo.png" />
    </div>
    <div class="h-full w-65 ml-auto flex justify-around">
      <n-menu
        class="w-full h-full flex items-center justify-around"
        :options="menuOptions"
        @update:value="handleRoute"
        v-model:value="headerStore.activeRoute"
        mode="horizontal"
      />
    </div>
    <n-flex justify="space-around" class="h-full items-center w-40 mr-10" size="large">
      <n-avatar round class="bg-green-500">微</n-avatar>
      <div class="flex items-center justify-center h-full">
        <n-icon size="24" color="#828594">
          <DiamondOutline />
        </n-icon>
      </div>
      <n-avatar round class="bg-blue-400">超</n-avatar>
    </n-flex>
  </n-layout-header>
</template>

<script setup lang="ts">
import { h, ref, reactive, onMounted, defineExpose } from 'vue'
import { NAvatar, NText, NIcon } from 'naive-ui'
import { DiamondOutline } from '@vicons/ionicons5'
import router from '@/routers/index'
import { useRoute } from 'vue-router'
import { sections } from '@/config/headerConfig'
import { useHeaderStore } from '@/stores/headerStore'

const activeRoute = ref(sessionStorage.getItem('activeRoute') || 'home')
const route = useRoute()
const headerStore = useHeaderStore()

const handleRoute = async (key: string) => {
  await router.push({ name: key })
  const currentRouteMeta = route.meta || null
  const parentKey = currentRouteMeta.parentKey as string
  const routeToSet = parentKey || key
  activeRoute.value = routeToSet
  headerStore.setActiveKey(parentKey)
}

onMounted(() => {
  if (activeRoute.value === null) {
    activeRoute.value = 'home'
    sessionStorage.setItem('activeRoute', 'home')
  }
})

const hoverStates = reactive(new Map())

const renderCustomSection = (section) => {
  if (!hoverStates.has(section.key)) {
    hoverStates.set(section.key, ref(false))
  }
  const hovering = hoverStates.get(section.key)

  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: hovering.value ? '#e6f7ff' : 'transparent'
      },
      onClick: () => handleRoute(section.key),
      onMouseenter: () => {
        hovering.value = true
      },
      onMouseleave: () => {
        hovering.value = false
      }
    },
    [
      h(
        NIcon,
        {
          size: '20',
          style: 'margin-right: 12px;'
        },
        {
          default: () => h(section.icon)
        }
      ),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => section.title })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => section.description })
        ])
      ])
    ]
  )
}

const menuOptions = ref(
  sections.map((section) => {
    if (section.children) {
      // 处理具有子菜单的section
      return {
        label: section.label,
        key: section.key,
        icon: section.icon,
        children: section.children.map((child) => ({
          key: child.key,
          type: 'render',
          render: () => renderCustomSection(child)
        }))
      }
    } else {
      return {
        key: section.key,
        label: section.label
      }
    }
  })
)
</script>