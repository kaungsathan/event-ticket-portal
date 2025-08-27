const menuList = [
  {
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/',
        action: 'view',
        subject: 'users'
      },
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
      }
    ]
  }
]

export default menuList
