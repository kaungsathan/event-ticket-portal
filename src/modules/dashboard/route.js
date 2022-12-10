const moduleRoutes = [
  {
    path: "",
    name: "dashboard",
    component: () => import("@/modules/dashboard/Index.vue"),
    meta: {
      layout: "collapse",
      subject: "users",
      action: "read"
    }
  }
]

export default moduleRoutes
