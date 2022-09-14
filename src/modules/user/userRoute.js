import App from "@/layouts/mainlayout/App.vue";
import isAuth from "@/middlewares/isAuth";

const userRoutes = [
  {
    path: "/user",
    name: "user",
    component: App,
    meta: { middleware: [isAuth] },
    children: [
      {
        path: "list",
        name: "userList",
        component: () => import("@/modules/user/list/User.vue"),
      },
      {
        path: "new",
        name: "newUser",
        component: () => import("@/modules/user/entry/NewUser.vue"),
      },
      {
        path: ":id/edit",
        name: "editUser",
        component: () => import("@/modules/user/entry/EditUser.vue"),
      },
    ],
  },
];

export default userRoutes;
