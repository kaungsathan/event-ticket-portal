import { createRouter, createWebHistory } from "vue-router";
import route from "./route";
import userRoutes from "@/modules/user/userRoute";

const routes = [
  ...route,
  ...userRoutes,
  {
    path: "/error-404",
    name: "error404",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    redirect: 'error-404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: "history",
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

export default router;
