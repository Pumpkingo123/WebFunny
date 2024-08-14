import { IosArrowDown, IosWarning, IosPulse } from '@vicons/ionicons4'
import { FileTrayFull } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/rederIcon'

interface Section {
  key: string
  title?: string
  description?: string
  label?: string
  icon?: any
  children?: Section[]
}

const sections: Section[] = [
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
]

export { sections }
