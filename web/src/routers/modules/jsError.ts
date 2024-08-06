import { RouteRecordRaw } from 'vue-router';
import jsError from '../../views/jsError/index.vue';

const jsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/jsError',
    name: 'jsError',
    component: jsError,
  }
];

export default jsRoutes;