import isGuest from "@/middlewares/isGuest"

const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("./login/Login"),
    meta: { middleware: [isGuest] },
  },
]

export default authRoutes
