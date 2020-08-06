/*
 * @Author: Cookie
 * @Date: 2020-08-06 13:57:23
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-06 17:16:12
 * @FilePath: /fe-bp-ops/src/pages/user/login/model.ts
 * @Description: 
 */
import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // hard code
  // reload Authorized component
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {

      const { data, response } = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: data,
      });

      if (response.headers.get('authorization')) localStorage.setItem('authorization', response.headers.get('authorization'));

      // Login successfully
      if (data.code === 0) {
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
