export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: '@/pages/index', title: '首页' },
      { path: '/welcome', component: '@/pages/Welcome', title: '欢迎' },
    ],
  },
];
