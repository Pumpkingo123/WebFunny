import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const resourceRoutes: Array<RouteRecordRaw> = [
  {
    path: '/resourceError',
    name: 'resourceError',
    component: Layout,
    children: [
      {
        path: '',
        name: '',
        component: () => import('../../views/resourceError/index.vue')
      }
    ]
  }
]

export default resourceRoutes
