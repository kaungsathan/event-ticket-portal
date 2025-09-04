const menuList = [
  {
    items: [
      // {
      //   label: 'Dashboard',
      //   icon: 'pi pi-fw pi-home',
      //   to: '/',
      //   action: 'view',
      //   subject: 'users'
      // },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        to: '/users',
        action: 'view',
        subject: 'users'
      },
      {
        label: 'Organizer',
        icon: 'pi pi-fw pi-users',
        to: '/organizers',
        action: 'view',
        subject: 'organizers'
      },
      {
        label: 'Event',
        icon: 'pi pi-fw pi-calendar',
        to: '/events',
        action: 'view',
        subject: 'events'
      },

      {
        label: 'Order',
        icon: 'pi pi-fw pi-cart-plus',
        to: '/orders',
        action: 'view',
        subject: 'orders'
      },

      {
        label: 'Setting',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Payments',
            icon: 'pi pi-fw pi-money-bill',
            to: '/payments',
            action: 'manage',
            subject: 'settings'
          },
          {
            label: 'Attributes',
            icon: 'pi pi-fw pi-list',
            to: '/attributes',
            action: 'manage',
            subject: 'settings'
          }
        ]
      }
    ]
  }
]

export default menuList
