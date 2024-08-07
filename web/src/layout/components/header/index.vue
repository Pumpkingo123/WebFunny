<template>
  <n-layout-header class="fixed z-10 flex justify-between has-sider h-14">
    <div class="h-full w-65 flex justify-center items-center">
      <img class="h-12" src="https://www.webfunny.cn/wf_center/logos/logo.png" />
    </div>
    <div class="h-full w-65 ml-auto">
      <n-menu
        class="w-full h-full flex items-center"
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
import { h, ref } from 'vue'
import { NAvatar, NText, NIcon } from 'naive-ui'
import { DiamondOutline, FileTrayFull } from '@vicons/ionicons5'
import { IosArrowDown, IosWarning, IosPulse } from '@vicons/ionicons4'
import { renderIcon } from '../../../utils/index'
import router from '../../../routers/index'

const activeRoute = ref<string | null | undefined>(null)

const handleRoute = (key, parentKey = null) => {
  const routeToSet = parentKey || key
  router.push({ name: key })
  activeRoute.value = routeToSet
  // console.log(`Routing to ${key}, active route is now ${activeRoute.value}`);
}

const renderCustomSection = (iconComponent, titleText, detailText, key, parentKey) => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;',
      onClick: () => handleRoute(key, parentKey)
    },
    [
      h(
        NIcon,
        {
          size: '20',
          style: 'margin-right: 12px;'
        },
        {
          default: () => h(iconComponent)
        }
      ),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => titleText })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => detailText })
        ])
      ])
    ]
  )
}

const menuOptions: MenuOption[] = [
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
        title: '错误统计',
        key: 'jsError',
        icon: IosWarning,
        type: 'render',
        parentKey: 'errorMenu',
        render: () =>
          renderCustomSection(
            IosWarning,
            '错误统计',
            '错误统计，错误详情，错误定位',
            'jsError',
            'errorMenu'
          )
      },
      {
        title: 'API接口错误统计',
        key: 'httpError',
        icon: IosPulse,
        type: 'render',
        parentKey: 'errorMenu',
        render: () =>
          renderCustomSection(
            IosPulse,
            'Api接口错误统计',
            '统计400，500等接口异常错误',
            'httpError',
            'errorMenu'
          )
      },
      {
        title: '静态资源错误统计',
        key: 'resourceError',
        icon: FileTrayFull,
        type: 'render',
        parentKey: 'errorMenu',
        render: () =>
          renderCustomSection(
            FileTrayFull,
            '静态资源错误统计',
            '统计js,css文件等加载失败',
            'resourceError',
            'errorMenu'
          )
      }
    ]
  }
]
</script>
