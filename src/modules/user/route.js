import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/user',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'userList',
                component: () => import('@/modules/user/list/List.vue'),
                meta: {
                    subject: 'users',
                    action: 'read'
                }
            },
            {
                path: 'new',
                name: 'newUser',
                component: () => import('@/modules/user/entry/New.vue'),
                meta: {
                    subject: 'users',
                    action: 'create'
                }
            },
            {
                path: ':id/edit',
                name: 'editUser',
                component: () => import('@/modules/user/entry/Edit.vue'),
                meta: {
                    subject: 'users',
                    action: 'edit'
                }
            }
        ]
    }
]

export default moduleRoutes
