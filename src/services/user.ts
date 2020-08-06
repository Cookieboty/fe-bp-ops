/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-06 22:14:34
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/user/getUserInfo');
}

export async function queryCurrent(): Promise<any> {
  return request('/user/getUserInfo');
}

export async function queryNotices(): Promise<any> {
  return request('/notices/get');
}
