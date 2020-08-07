/*
 * @Author: Cookie
 * @Date: 2020-08-07 20:43:25
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 21:33:40
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { ListItemDataType } from './data';
import { queryProject } from '@/services/project';

export interface StateType {
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'project',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(queryProject, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const { data } = yield call(queryProject, payload);
      yield put({
        type: 'appendList',
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
    appendList(state, action) {
      return {
        ...state,
        list: (state as StateType).list.concat(action.payload),
      };
    },
  },
};

export default Model;
