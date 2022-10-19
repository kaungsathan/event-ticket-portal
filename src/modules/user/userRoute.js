const userRoutes = [
  {
    path: "/user/list",
    name: "userList",
    component: () => import("@/modules/user/list/User.vue"),
    meta: {
      resource: "user",
      action: "read",
      layout: "collapse"
    }
  },
  {
    path: "/user/new",
    name: "newUser",
    component: () => import("@/modules/user/entry/NewUser.vue"),
    meta: {
      resource: "user",
      action: "create",
      layout: "collapse"
    }
  },
  {
    path: "/user/:id/edit",
    name: "editUser",
    component: () => import("@/modules/user/entry/EditUser.vue"),
    meta: {
      resource: "user",
      action: "edit",
      layout: "collapse"
    }
  }
]

export default userRoutes
