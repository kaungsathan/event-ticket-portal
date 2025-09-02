import AppLayout from '@/layout/AppLayout.vue'

const moduleRoutes = [
  {
    path: '/events',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'eventList',
        component: () => import('@/modules/event/list/List.vue'),
        meta: {
          subject: 'events',
          action: 'view',
          auth: true,
          title: 'Event'
        }
      },
      {
        path: 'new',
        name: 'newEvent',
        component: () => import('@/modules/event/entry/New.vue'),
        meta: {
          subject: 'events',
          action: 'create',
          auth: true,
          title: 'New Event'
        }
      },
      {
        path: ':id/edit',
        name: 'editEvent',
        component: () => import('@/modules/event/entry/Edit.vue'),
        meta: {
          subject: 'events',
          action: 'edit',
          auth: true,
          title: 'Edit Event'
        }
      }
    ]
  }
]

export default moduleRoutes
