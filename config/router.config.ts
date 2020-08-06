export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // {
      //   path: '/user',
      //   component: '../layouts/UserLayout',
      //   routes: [
      //     {
      //       path: '/user',
      //       redirect: '/user/login',
      //     },
      //     {
      //       name: 'login',
      //       icon: 'smile',
      //       path: '/user/login',
      //       component: './user/login',
      //     },
      //     {
      //       name: 'register-result',
      //       icon: 'smile',
      //       path: '/user/register-result',
      //       component: './user/register-result',
      //     },
      //     {
      //       name: 'register',
      //       icon: 'smile',
      //       path: '/user/register',
      //       component: './user/register',
      //     },
      //     {
      //       component: '404',
      //     },
      //   ],
      // },
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
        ],
      },
      //     {
      //       path: '/form',
      //       icon: 'form',
      //       name: 'form',
      //       routes: [
      //         {
      //           name: 'basic-form',
      //           icon: 'smile',
      //           path: '/form/basic-form',
      //           component: './form/basic-form',
      //         },
      //         {
      //           name: 'step-form',
      //           icon: 'smile',
      //           path: '/form/step-form',
      //           component: './form/step-form',
      //         },
      //         {
      //           name: 'advanced-form',
      //           icon: 'smile',
      //           path: '/form/advanced-form',
      //           component: './form/advanced-form',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/list',
      //       icon: 'table',
      //       name: 'list',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           name: 'search-list',
      //           component: './list/search',
      //           routes: [
      //             {
      //               path: '/list/search',
      //               redirect: '/list/search/articles',
      //             },
      //             {
      //               name: 'articles',
      //               icon: 'smile',
      //               path: '/list/search/articles',
      //               component: './list/search/articles',
      //             },
      //             {
      //               name: 'projects',
      //               icon: 'smile',
      //               path: '/list/search/projects',
      //               component: './list/search/projects',
      //             },
      //             {
      //               name: 'applications',
      //               icon: 'smile',
      //               path: '/list/search/applications',
      //               component: './list/search/applications',
      //             },
      //           ],
      //         },
      //         {
      //           name: 'table-list',
      //           icon: 'smile',
      //           path: '/list/table-list',
      //           component: './list/table-list',
      //         },
      //         {
      //           name: 'basic-list',
      //           icon: 'smile',
      //           path: '/list/basic-list',
      //           component: './list/basic-list',
      //         },
      //         {
      //           name: 'card-list',
      //           icon: 'smile',
      //           path: '/list/card-list',
      //           component: './list/card-list',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/profile',
      //       name: 'profile',
      //       icon: 'profile',
      //       routes: [
      //         {
      //           name: 'basic',
      //           icon: 'smile',
      //           path: '/profile/basic',
      //           component: './profile/basic',
      //         },
      //         {
      //           name: 'advanced',
      //           icon: 'smile',
      //           path: '/profile/advanced',
      //           component: './profile/advanced',
      //         },
      //       ],
      //     },
      //     {
      //       name: 'result',
      //       icon: 'CheckCircleOutlined',
      //       path: '/result',
      //       routes: [
      //         {
      //           name: 'success',
      //           icon: 'smile',
      //           path: '/result/success',
      //           component: './result/success',
      //         },
      //         {
      //           name: 'fail',
      //           icon: 'smile',
      //           path: '/result/fail',
      //           component: './result/fail',
      //         },
      //       ],
      //     },
      //     {
      //       name: 'exception',
      //       icon: 'warning',
      //       path: '/exception',
      //       routes: [
      //         {
      //           name: '403',
      //           icon: 'smile',
      //           path: '/exception/403',
      //           component: './exception/403',
      //         },
      //         {
      //           name: '404',
      //           icon: 'smile',
      //           path: '/exception/404',
      //           component: './exception/404',
      //         },
      //         {
      //           name: '500',
      //           icon: 'smile',
      //           path: '/exception/500',
      //           component: './exception/500',
      //         },
      //       ],
      //     },
      //     {
      //       name: 'account',
      //       icon: 'user',
      //       path: '/account',
      //       routes: [
      //         {
      //           name: 'center',
      //           icon: 'smile',
      //           path: '/account/center',
      //           component: './account/center',
      //         },
      //         {
      //           name: 'settings',
      //           icon: 'smile',
      //           path: '/account/settings',
      //           component: './account/settings',
      //         },
      //       ],
      //     },
      //       {
      //         name: 'editor',
      //         icon: 'highlight',
      //         path: '/editor',
      //         routes: [
      //           {
      //             name: 'flow',
      //             icon: 'smile',
      //             path: '/editor/flow',
      //             component: './editor/flow',
      //           },
      //           {
      //             name: 'mind',
      //             icon: 'smile',
      //             path: '/editor/mind',
      //             component: './editor/mind',
      //           },
      //           {
      //             name: 'koni',
      //             icon: 'smile',
      //             path: '/editor/koni',
      //             component: './editor/koni',
      //           },
      //         ],
      //       },
      //       {
      //         component: '404',
      //       },
      //     ],
      //   },
    ],
  },
];
