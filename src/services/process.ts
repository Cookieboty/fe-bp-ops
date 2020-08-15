/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-15 21:06:19
 * @FilePath: /fe-bp-ops/src/services/user.ts
 * @Description:
 */

import request from '@/utils/request';

export interface ProjectListParamsType {
  pageSize: Number;
  pageNum: Number;
}

export interface ProjectParamsType {
  projectId: String;
}
export interface DeployOperation {
  id: number;
  path: string;
  projectId: string;
  createdAt: string;
  updateAt: string;
  updatedAt: string;
}

export interface IProjectDetailDTO {
  deployOperation: DeployOperation[];
}

export async function queryProcessList(params: ProjectListParamsType) {
  return request('/process/getList', {
    method: 'GET',
    params,
  });
}

export async function queryProject(params: ProjectParamsType) {
  return request('/project/get', {
    method: 'GET',
    params,
  });
}
