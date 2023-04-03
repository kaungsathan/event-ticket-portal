const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/modules/auth/login/Login.vue'),
        meta: { redirectIfLoggedIn: true }
    }
]

export default authRoutes
