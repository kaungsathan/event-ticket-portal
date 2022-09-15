import { createRouter, createWebHistory } from "vue-router"
import route from "./route"
import userRoutes from "@/modules/user/userRoute"
import authRoutes from "@/modules/auth/authRoute"
// import middlewarePipeline from "./middlewarePipeline"
import { useAuthStore } from "@/modules/auth/authStore"
import { canNavigate } from "@/libs/acl/routeProtection"

const routes = [
  ...route,
  ...authRoutes,
  ...userRoutes,
  {
    path: "/error-404",
    name: "error404",
    component: () => import("@/pages/NotFound.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/not-authorized",
    name: "not-authorized",
    component: () => import("@/pages/Access.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "error-404",
    meta: {
      layout: "full",
    },
  },
]

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
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)

  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuth
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: "login" })

    // If logged in => not authorized
    return next({ name: "not-authorized" })
  }
  return next()

  // if (!to.meta.middleware) {
  //   return next()
  // }
  // const middleware = to.meta.middleware
  // const store = useAuthStore()

  // const context = {
  //   to,
  //   from,
  //   next,
  //   store,
  // }

  // return middleware[0]({
  //   ...context,
  //   next: middlewarePipeline(context, middleware, 1),
  // })
})

export default router
