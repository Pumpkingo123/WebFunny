import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const httpRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: '',
    component: Layout,
    children: [
      {
        path: '/httpError',
        name: 'httpError',
        component: () => import('../../views/httpError/index.vue'),
        meta: {
          parentKey: 'errorMenu'
        }
      }
    ]
  }
]

export default httpRoutes
