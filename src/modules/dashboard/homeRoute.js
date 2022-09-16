const dashboardRoutes = [
  {
    path: "",
    name: "dashboard",
    component: () => import("@/modules/dashboard/Home.vue"),
    meta: {
      layout: "default"
    }
  }
]

export default dashboardRoutes
