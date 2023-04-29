export default [
  { path: '/', title:"主页",component: 'Home/index' },
  { path: '/app', title: '应用', component: 'App/index' },
  { path: '/app/:id/:name',title:"应用详情", component: 'App/Details/index' },
  { path: '/sub', title: '订阅', component: 'Sub/index' },
  { path: '/my', title: '个人中心', component: 'My/index' },
  {
    path: '/*',
    title: '404',
    layout: false,
    component: '@/pages/404.tsx',
  },
];
