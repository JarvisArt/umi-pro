export default [
  {
    title: '登录',
    path: '/user/login',
    component: '@/pages/login',
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/projects',
      },
      {
        title: '我的项目',
        path: '/projects',
        component: '@/pages/projects',
      },
      {
        title: '我的看板',
        path: '/projects/:projectId/board',
        component: '@/pages/board',
      },
      {
        title: '事件分析',
        path: '/projects/:projectId/analysis',
        component: '@/pages/analysis',
      },
    ],
  },
];
