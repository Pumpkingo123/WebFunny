import { RouteRecordRaw } from 'vue-router';
import httpError from '../../views/httpError/index.vue';

const httpRoutes: Array<RouteRecordRaw> = [
  {
    path: '/httpError',
    name: 'httpError',
    component: httpError,
  }
];

export default httpRoutes;