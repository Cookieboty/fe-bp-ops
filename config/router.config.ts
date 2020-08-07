/*
 * @Author: Cookie
 * @Date: 2020-08-06 21:46:04
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 21:12:27
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
            path: '/project',
            name: 'CICD',
            icon: 'project',
            routes: [
              {
                name: '工程管理',
                icon: 'smile',
                path: '/project',
                component: './project',
              },
            ],
          },
        ],
      },
    ],
  },
];
