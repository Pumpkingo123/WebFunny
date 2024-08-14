import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'home',
        redirect: '/'
      }
    ]
  }
]

export default homeRoutes
