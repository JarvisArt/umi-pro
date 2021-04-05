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
        path: '/projects/:id/board',
        component: '@/pages/board',
      },
      {
        path: '/projects/:id/analysis',
        component: '@/pages/analysis',
        routes: [
          {
            path: '/projects/:id/analysis',
            redirect: '/projects/:id/analysis/event-analysis',
          },
          {
            title: '事件分析',
            path: '/projects/:id/analysis/event-analysis',
            component: '@/pages/analysis/event-analysis',
          },
        ],
      },
    ],
  },
];
