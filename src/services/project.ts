/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-06 23:19:34
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export interface ProjectParamsType {
  pageSize: Number;
  pageNum: Number;
}

export async function queryProjectNotice(params: ProjectParamsType) {
  return request('/project/getList', {
    method: 'GET',
    params,
  });
}
