export default [
  { path: "/", redirect: "/home" },
  { path: "/home", title: "主页", component: "Home/index" },
  { path: "/app", title: "应用", component: "App/index" },
  { path: "/app/:id", title: "应用详情", component: "App/Details/index" },
  { path: "/sub", title: "订阅", component: "Sub/index" },
  { path: "/my", title: "个人中心", component: "My/index" },
  { path: "/database", title: "数据查看", component: "Database/index" },
  { path: "/actions", title: "Surge", component: "Actions/index" },
  { path: "/code", title: "代码编辑器", component: "CodeEdit/index" },
  {
    path: "/*",
    title: "404",
    layout: false,
    component: "@/pages/404.tsx",
  },
];
