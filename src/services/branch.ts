/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 11:14:13
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export interface BranchParamsType {
  projectSourceId: Number;
}

export async function queryBranchList(params: BranchParamsType) {
  return request('/branch/getList', {
    method: 'GET',
    params,
  });
}
