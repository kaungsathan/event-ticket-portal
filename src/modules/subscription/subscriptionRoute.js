const subscriptionRoutes = [
  {
    path: "/subscription/list",
    name: "subscriptionList",
    component: () => import("@/modules/subscription/list/Subscription.vue"),
    meta: {
      resource: "scsc-subscription",
      action: "index",
      layout: "collapse"
    }
  }
]

export default subscriptionRoutes
