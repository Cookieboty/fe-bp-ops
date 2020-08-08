/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 11:27:23
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { queryBranchList } from '@/services/branch';
import { queryProject } from '@/services/project';

import { BranchDataType, ProjectDetailDataType } from './data';

export interface StateType {
  project?: ProjectDetailDataType;
  branchList?: BranchDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchProject: Effect;
    fetchBranchList: Effect;
  };
  reducers: {
    queryProject: Reducer<StateType>;
    queryBranch: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'projectDetail',
  state: {
    project: {},
    branchList: [],
  },
  effects: {
    *fetchProject({ payload }, { call, put }) {
      const { data } = yield call(queryProject, payload);
      yield put({
        type: 'queryProject',
        payload: data,
      });
    },
    *fetchBranchList({ payload }, { call, put }) {
      const { data } = yield call(queryBranchList, payload);
      yield put({
        type: 'queryBranch',
        payload: Array.isArray(data) ? data : [],
      });
    },
  },
  reducers: {
    queryProject(state, { payload }) {
      return {
        ...state,
        project: payload,
      };
    },
    queryBranch(state, { payload }) {
      return {
        ...state,
        branchList: payload,
      };
    },
  },
};

export default Model;
