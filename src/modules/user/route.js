const moduleRoutes = [
  {
    path: "/user/list",
    name: "userList",
    component: () => import("@/modules/user/list/List.vue"),
    meta: {
      subject: "users",
      action: "read",
      layout: "collapse"
    }
  },
  {
    path: "/user/new",
    name: "newUser",
    component: () => import("@/modules/user/entry/New.vue"),
    meta: {
      subject: "users",
      action: "create",
      layout: "collapse"
    }
  },
  {
    path: "/user/:id/edit",
    name: "editUser",
    component: () => import("@/modules/user/entry/Edit.vue"),
    meta: {
      subject: "users",
      action: "edit",
      layout: "collapse"
    }
  }
]

export default moduleRoutes
