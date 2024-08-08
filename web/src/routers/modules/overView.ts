import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const overViewRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'overviewLayout',
    component: Layout,
    children: [
      {
        path: '/overView',
        name: 'overView',
        component: () => import('../../views/overView/index.vue')
      }
    ]
  }
]

export default overViewRoutes
