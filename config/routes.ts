const routes = [
  {
    title: '登录',
    path: '/login',
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
        path: '/projects/:id/dashboard',
        component: '@/pages/dashboard',
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

/**
 * 路由匹配不到渲染404页面
 */
const filling404 = (list: any) => {
  list.forEach((item: any) => {
    if (!item.routes) {
      return;
    }
    item.routes.push({ component: '@/pages/exception/404' });
    filling404(item.routes);
  });
};

filling404(routes);

export default routes;
