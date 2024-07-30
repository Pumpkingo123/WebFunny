import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/main",
    name: "Main",
    alias: "/",
    component:() => import("../pages/main.vue")
  },
  {
    path: "/overView",
    name: "overView",
    component:() => import("../pages/overView.vue")
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;