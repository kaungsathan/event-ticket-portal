const moduleRoutes = [
  {
    path: "/user/list",
    name: "userList",
    component: () => import("@/modules/user/list/List.vue"),
    meta: {
      subject: "user",
      action: "read",
      layout: "collapse"
    }
  },
  {
    path: "/user/new",
    name: "newUser",
    component: () => import("@/modules/user/entry/New.vue"),
    meta: {
      subject: "user",
      action: "create",
      layout: "collapse"
    }
  },
  {
    path: "/user/:id/edit",
    name: "editUser",
    component: () => import("@/modules/user/entry/Edit.vue"),
    meta: {
      subject: "user",
      action: "edit",
      layout: "collapse"
    }
  }
]

export default moduleRoutes
