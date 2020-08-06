/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-06 15:45:06
 * @FilePath: /fe-bp-ops/config/proxy.ts
 * @Description: 
 */

export default {
  dev: {
    '/api/': {
      target: 'http://127.0.0.1:7001',
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
