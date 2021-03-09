export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/apps' },
      { path: '/apps', component: '@/pages/Apps', title: '我的项目' },
      { path: '/welcome', component: '@/pages/Welcome', title: '欢迎' },
    ],
  },
];
