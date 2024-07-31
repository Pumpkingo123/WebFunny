import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/main",
    name: "Main",
    alias: "/",
    component:() => import("../pages/main.vue")
  },
  {
    path: "/jsError",
    name: "jsError",
    component:() => import("../pages/jsError.vue"),
  },
  {
    path: "/httpError",
    name: "httpError",
    component:() => import("../pages/httpError.vue")
  },
  {
    path: "/resourceError",
    name: "resourceError",
    component:() => import("../pages/resourceError.vue")
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;