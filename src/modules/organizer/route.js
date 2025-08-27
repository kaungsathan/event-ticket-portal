import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/organizers',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'organizerList',
        component: () => import('@/modules/organizer/list/List.vue'),
        meta: {
          subject: 'organizers',
          action: 'view',
          auth: true,
          title: 'Organizer'
        }
      },
      {
        path: 'new',
        name: 'newOrganizer',
        component: () => import('@/modules/organizer/entry/New.vue'),
        meta: {
          subject: 'organizers',
          action: 'create',
          auth: true,
          title: 'New Organizer'
        }
      },
      {
        path: ':id/edit',
        name: 'editOrganizer',
        component: () => import('@/modules/organizer/entry/Edit.vue'),
        meta: {
          subject: 'organizers',
          action: 'edit',
          auth: true,
          title: 'Edit Organizer'
        }
      }
    ]
  }
]

export default moduleRoutes
