/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-06 08:35:10
 * @FilePath: /fe-bp-ops/config/proxy.ts
 * @Description: 
 */

export default {
  dev: {
    '/api/': {
      target: 'http://192.168.160.88:1001',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
