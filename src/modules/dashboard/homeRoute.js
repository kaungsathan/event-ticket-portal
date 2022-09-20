const dashboardRoutes = [
  {
    path: "",
    name: "dashboard",
    component: () => import("@/modules/dashboard/Home.vue"),
    meta: {
      layout: "default",
      resource: "dashboard",
      action: "read"
    }
  }
]

export default dashboardRoutes
