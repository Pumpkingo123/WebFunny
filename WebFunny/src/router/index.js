import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/main",
    name: "Main",
    alias: "/",
    meta: { active: 'main' },
    component:() => import("../pages/main.vue")
  },
  {
    path: "/jsError",
    name: "jsError",
    meta: { active: 'jsError' },
    component:() => import("../pages/jsError.vue")
  },
  {
    path: "/httpError",
    name: "httpError",
    meta: { active: 'httpError' },
    component:() => import("../pages/httpError.vue")
  },
  {
    path: "/resourceError",
    name: "resourceError",
    meta: { active: 'resourceError' },
    component:() => import("../pages/resourceError.vue")
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;