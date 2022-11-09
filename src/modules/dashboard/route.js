const moduleRoutes = [
  {
    path: "",
    name: "dashboard",
    component: () => import("@/modules/dashboard/Index.vue"),
    meta: {
      layout: "collapse",
      subject: "dashboard",
      action: "read"
    }
  }
]

export default moduleRoutes
