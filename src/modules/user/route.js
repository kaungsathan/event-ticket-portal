import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/users',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'userList',
        component: () => import('@/modules/user/list/List.vue'),
        meta: {
          subject: 'users',
          action: 'view',
          auth: true,
          title: 'User'
        }
      },
      {
        path: 'new',
        name: 'newUser',
        component: () => import('@/modules/user/entry/New.vue'),
        meta: {
          subject: 'users',
          action: 'create',
          auth: true,
          title: 'New User'
        }
      },
      {
        path: ':id/edit',
        name: 'editUser',
        component: () => import('@/modules/user/entry/Edit.vue'),
        meta: {
          subject: 'users',
          action: 'edit',
          auth: true,
          title: 'Edit User'
        }
      },
      {
        path: ':id/show',
        name: 'showUser',
        component: () => import('@/modules/user/entry/Edit.vue'),
        meta: {
          subject: 'users',
          action: 'edit',
          auth: true,
          title: 'Edit User'
        }
      }
    ]
  }
]

export default moduleRoutes
