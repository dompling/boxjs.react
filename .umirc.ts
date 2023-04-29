import { defineConfig } from "@umijs/max";

const path = process.env.NODE_ENV === 'development' ? '/' : './';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  title: 'BoxJs',
  //打包路径
  base: path,
  publicPath: path,
  routes: [
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
  ],
  fastRefresh: true,
  model: {},
  antd: {},
  request: {},
  initialState: {},
  dva: {},
  layout: false,
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  npmClient: 'yarn',
});
