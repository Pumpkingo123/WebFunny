import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '',  // 这应该是 '/' 表示根路径
    name: '',  // 给这个布局路由一个名字，比如 'layout'
    component: Layout,
    children: [
      {
        path: '/home',  // 空字符串表示这是默认的子路由
        name: 'home',
        component: () => import('../../views/home/index.vue')
      }
    ]
  }
]

export default homeRoutes;
