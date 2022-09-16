const menuList = [
  {
    label: "Modules",
    items: [
      {
        label: "User List",
        icon: "pi pi-fw pi-user",
        to: "/user/list",
        action: "read",
        resource: "user",
      },
    ],
  },
  {
    label: "Home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        to: "/",
        action: "read",
        resource: "home",
      },
    ],
  },
];

export default menuList;
