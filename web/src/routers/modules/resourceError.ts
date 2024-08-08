import { RouteRecordRaw } from 'vue-router'
import { Layout } from '../constant'

const resourceRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: '',
    component: Layout,
    children: [
      {
        path: '/resourceError',
        name: 'resourceError',
        component: () => import('../../views/resourceError/index.vue'),
        meta: {
          parentKey: 'errorMenu' 
        }
      }
    ]
  }
]

export default resourceRoutes
