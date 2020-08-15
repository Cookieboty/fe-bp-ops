/*
 * @Author: Cookie
 * @Date: 2020-08-06 21:46:04
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-15 20:01:49
 * @Description:
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        name: '用户模块',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/',
            redirect: '/dashboard/workplace',
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                name: 'workplace',
                icon: 'smile',
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
              },
            ],
          },
          {
            path: '/cicd',
            name: 'CICD',
            icon: 'project',
            routes: [
              {
                path: '/cicd',
                redirect: '/cicd/project',
              },
              {
                name: '工程管理',
                icon: 'smile',
                path: '/cicd/project',
                component: './cicd/project',
              },
              {
                path: '/cicd/projectDetail/:projectId',
                name: '工程详情',
                hideInMenu: true,
                component: './CICD/projectDetail',
              },
            ],
          },
          {
            path: '/program',
            name: '项目管理',
            icon: 'project',
            routes: [
              {
                path: '/program',
                redirect: '/cicd/list',
              },
              {
                name: '流程中心',
                icon: 'smile',
                path: '/program/list',
                component: './program/programList',
              },
            ],
          },
        ],
      },
    ],
  },
];
