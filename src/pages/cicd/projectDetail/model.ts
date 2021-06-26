/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2021-06-26 20:46:59
 * @Description:
 */
import type { Effect, Reducer } from 'umi';
import { queryBranchList, submitTest, deploy } from '@/services/branch';
import { queryProject } from '@/services/project';

import type { BranchDataType, ProjectDetailDataType } from './data';

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
    submitTest: Effect;
    deploy: Effect;
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
      const {
        project: { id },
      } = payload;
      if (!id) return;
      const { data } = yield call(queryBranchList, {
        projectId: id,
      });
      yield put({
        type: 'queryBranch',
        payload: Array.isArray(data) ? data : [],
      });
    },
    *submitTest({ payload }, { call, put }) {
      const { data } = yield call(submitTest, payload);
      yield put({
        type: 'submitTest',
        payload: data,
      });
    },
    *deploy({ payload }, { call, put }) {
      // const { data } = yield call(deploy, payload);
      yield window.socket.emit('creatJob', { payload })
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
