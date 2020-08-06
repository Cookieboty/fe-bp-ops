/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-06 17:17:05
 * @FilePath: /fe-bp-ops/src/services/login.ts
 * @Description: 
 */
import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/user/getUserToken', {
    getResponse: true,
    method: 'POST',
    data: { params },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
