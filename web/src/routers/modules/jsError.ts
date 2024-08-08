import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const jsRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: '',
    component: Layout,
    children: [
      {
        path: '/jsError',
        name: 'jsError',
        component: () => import('../../views/jsError/index.vue'),
        meta:{
          parentKey:'errorMenu'
        }
      }
    ]
  }
]

export default jsRoutes
