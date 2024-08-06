import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routes: RouteRecordRaw[] = Object.keys(modules).reduce((routes, modulePath) => {
  const moduleRoutes = modules[modulePath].default;
  return routes.concat(moduleRoutes);
}, []);

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
