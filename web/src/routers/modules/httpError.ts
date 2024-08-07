import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const httpRoutes: Array<RouteRecordRaw> = [
  {
    path: '/httpError',
    name: 'httpError',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('../../views/httpError/index.vue')
      }
    ]
  }
]

export default httpRoutes
