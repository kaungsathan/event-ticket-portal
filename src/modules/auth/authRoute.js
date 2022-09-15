const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./login/Login"),
    meta: { redirectIfLoggedIn: true },
  },
]

export default authRoutes
