/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:42:39
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export interface BranchParamsType {
  projectSourceId: number;
}

export async function queryBranchList(params: BranchParamsType) {
  return request('/branch/getList', {
    method: 'GET',
    params,
  });
}


export async function submitTest(params: BranchParamsType) {
  return request('/branch/submitTest', {
    method: 'POST',
    params,
  });
}


export async function deploy(params: BranchParamsType) {
  return request('/creatJob', {
    method: 'post',
    data: { params },
  });
}



