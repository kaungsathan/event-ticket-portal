import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/modules/dashboard/Index.vue'),
        meta: {
          auth: true,
          subject: 'Home',
          action: 'read'
        }
      }
    ]
  }
]

export default moduleRoutes
