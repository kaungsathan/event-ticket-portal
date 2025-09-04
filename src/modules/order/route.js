import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/orders',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'orderList',
        component: () => import('@/modules/order/list/List.vue'),
        meta: {
          subject: 'orders',
          action: 'view',
          auth: true,
          title: 'Order'
        }
      },
      {
        path: 'new',
        name: 'newOrder',
        component: () => import('@/modules/order/entry/New.vue'),
        meta: {
          subject: 'orders',
          action: 'create',
          auth: true,
          title: 'New Order'
        }
      }
      //   {
      //     path: ':id/edit',
      //     name: 'editOrder',
      //     component: () => import('@/modules/order/entry/Edit.vue'),
      //     meta: {
      //       subject: 'orders',
      //       action: 'edit',
      //       auth: true,
      //       title: 'Edit Order'
      //     }
      //   }
    ]
  }
]

export default moduleRoutes
