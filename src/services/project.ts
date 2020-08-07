/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 21:30:42
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export interface ProjectParamsType {
  pageSize: Number;
  pageNum: Number;
}

export async function queryProject(params: ProjectParamsType) {
  return request('/project/getList', {
    method: 'GET',
    params,
  });
}
