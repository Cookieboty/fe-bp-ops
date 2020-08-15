/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-15 21:15:29
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { queryProcessList } from '@/services/process';

import { BranchDataType } from './data';

export interface StateType {
  processList?: BranchDataType[];
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
        type: 'queryProcess',
        payload: Array.isArray(data) ? data : [],
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
