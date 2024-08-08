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
        v-model:value="activeRoute"
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
import { h, ref, onMounted } from 'vue'
import { NAvatar, NText, NIcon } from 'naive-ui'
import { DiamondOutline, FileTrayFull } from '@vicons/ionicons5'
import { IosArrowDown, IosWarning, IosPulse } from '@vicons/ionicons4'
import { renderIcon } from '../../../utils/index'
import router from '../../../routers/index'
import { useRoute } from 'vue-router'

const activeRoute = ref(localStorage.getItem('activeRoute') || 'home')

const route = useRoute()

const handleRoute = async (key: string) => {
  await router.push({ name: key })
  const currentRouteMeta = route.meta || null
  const parentKey = currentRouteMeta.parentKey as string
  const routeToSet = parentKey || key
  activeRoute.value = routeToSet
  localStorage.setItem('activeRoute', routeToSet)
  console.log('Route set to:', routeToSet)
}

onMounted(() => {
  if (activeRoute.value === null) {
    activeRoute.value = 'home'
    localStorage.setItem('activeRoute', 'home')
  }
  console.log('222', activeRoute.value)
})

const renderCustomSection = (section) => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
      onClick: () => handleRoute(section.key)
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

interface Section {
  key: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: any;  // 根据你的实际类型进行调整
  children?: Section[];  // 递归类型，子菜单也遵循同样的结构
}

const sections = ref<Section[]>([
  {
    label: '首页',
    key: 'home'
  },
  {
    label: '概览',
    key: 'overView'
  },
  {
    label: '错误',
    key: 'errorMenu',
    icon: renderIcon(IosArrowDown),
    children: [
      {
        icon: IosWarning,
        title: '错误统计',
        description: '错误统计，错误详情，错误定位',
        key: 'jsError'
      },
      {
        icon: IosPulse,
        title: 'Api接口错误统计',
        description: '统计400，500等接口异常错误',
        key: 'httpError'
      },
      {
        icon: FileTrayFull,
        title: '静态资源错误统计',
        description: '统计js,css文件等加载失败',
        key: 'resourceError'
      }
    ]
  }
])

const menuOptions = ref(
  sections.value.map((section) => {
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
