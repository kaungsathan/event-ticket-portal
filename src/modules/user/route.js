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
                    action: 'read',
                    title: 'User',
                    breadcrumbs: [{ title: 'User List', routeName: 'userList' }]
                }
            },
            {
                path: 'new',
                name: 'newUser',
                component: () => import('@/modules/user/entry/New.vue'),
                meta: {
                    subject: 'users',
                    action: 'create',
                    title: 'New User',
                    breadcrumbs: [
                        { title: 'User List', routeName: 'userList' },
                        { title: 'New', routeName: 'newUser' }
                    ]
                }
            },
            {
                path: ':id/edit',
                name: 'editUser',
                component: () => import('@/modules/user/entry/Edit.vue'),
                meta: {
                    subject: 'users',
                    action: 'edit',
                    title: 'Edit User',
                    breadcrumbs: [
                        { title: 'User List', routeName: 'userList' },
                        { title: 'Edit', routeName: 'editUser' }
                    ]
                }
            }
        ]
    }
]

export default moduleRoutes
