import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const jsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/jsError',
    name: 'jsError',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('../../views/jsError/index.vue')
      }
    ]
  }
]

export default jsRoutes
