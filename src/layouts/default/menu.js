const menuList = [
  {
    label: "modules",
    items: [
      {
        label: "userList",
        icon: "pi pi-fw pi-user",
        to: "/user/list"
        // action: "read",
        // resource: "user"
      },
      {
        label: "subscriptionList",
        icon: "pi pi-fw pi-user",
        to: "/subscription/list"
        // action: "index",
        // resource: "scsc-subscription"
      }
    ]
  },
  {
    label: "home",
    items: [
      {
        label: "dashboard",
        icon: "pi pi-fw pi-home",
        to: "/"
        // action: "read",
        // resource: "dashboard"
      }
    ]
  }
]

export default menuList
