export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/projects' },
      { path: '/projects', component: '@/pages/Projects', title: '我的项目' },
      { path: '/projects/:projectId/board', component: '@/pages/Board', title: '我的看板' },
    ],
  },
];
