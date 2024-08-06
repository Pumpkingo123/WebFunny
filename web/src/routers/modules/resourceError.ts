import { RouteRecordRaw } from 'vue-router';
import resourceError from '../../views/resourceError/index.vue';

const jsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/resourceError',
    name: 'resourceError',
    component: resourceError,
  }
];

export default jsRoutes;