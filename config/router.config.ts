/*
 * @Author: Cookie
 * @Date: 2020-08-06 21:46:04
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 22:15:25
 * @Description:
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
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
                name: '工程管理',
                icon: 'smile',
                path: '/cicd/project',
                component: './project',
              },
            ],
          },
        ],
      },
    ],
  },
];
