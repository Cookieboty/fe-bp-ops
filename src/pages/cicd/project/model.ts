/*
 * @Author: Cookie
 * @Date: 2020-08-07 20:43:25
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 11:21:10
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { ListItemDataType } from './data';
import { queryProjectList } from '@/services/project';

export interface StateType {
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'project',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(queryProjectList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
