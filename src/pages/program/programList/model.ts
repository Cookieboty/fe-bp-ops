/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-15 22:48:47
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { queryProcessList } from '@/services/process';

import { ProcessDataType } from './data';

export interface StateType {
  processList?: ProcessDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchProcessList: Effect;
  };
  reducers: {
    queryProcessList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'programList',
  state: {
    processList: [],
  },
  effects: {
    *fetchProcessList({ payload }, { call, put }) {
      const { pageSize, pageNum } = payload;
      const { data } = yield call(queryProcessList, {
        pageSize,
        pageNum,
      });
      yield put({
        type: 'queryProcessList',
        payload: Array.isArray(data.rows) ? data.rows : [],
      });
    },
  },
  reducers: {
    queryProcessList(state, { payload }) {
      return {
        ...state,
        processList: payload,
      };
    },
  },
};

export default Model;
