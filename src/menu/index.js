const menuList = [
  {
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/',
        action: 'read',
        subject: 'Home'
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        to: '/users/list',
        action: 'read',
        subject: 'User'
      }
    ]
  }
]

export default menuList
