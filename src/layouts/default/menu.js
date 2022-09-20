const menuList = [
  {
    label: "modules",
    items: [
      {
        label: "userList",
        icon: "pi pi-fw pi-user",
        to: "/user/list",
        action: "read",
        resource: "user"
      }
    ]
  },
  {
    label: "home",
    items: [
      {
        label: "dashboard",
        icon: "pi pi-fw pi-home",
        to: "/",
        action: "read",
        resource: "dashboard"
      }
    ]
  }
]

export default menuList
