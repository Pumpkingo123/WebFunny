import { RouteRecordRaw } from 'vue-router';
import home from '../../views/home/index.vue';

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: home
  }
];

export default homeRoutes;