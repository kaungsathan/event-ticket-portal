import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/payments',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'paymentList',
        component: () => import('@/modules/setting/payment/list/List.vue'),
        meta: {
          subject: 'settings',
          action: 'manage',
          auth: true,
          title: 'Payment'
        }
      },
      {
        path: ':id/edit',
        name: 'editPayment',
        component: () => import('@/modules/setting/payment/entry/Edit.vue'),
        meta: {
          subject: 'settings',
          action: 'manage',
          auth: true,
          title: 'Edit Payment'
        }
      }
    ]
  }
]

export default moduleRoutes
