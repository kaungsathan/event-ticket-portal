import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/attributes',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'attributeList',
        component: () => import('@/modules/setting/attribute/list/List.vue'),
        meta: {
          subject: 'settings',
          action: 'manage',
          auth: true,
          title: 'Attribute'
        }
      }
    ]
  }
]

export default moduleRoutes
