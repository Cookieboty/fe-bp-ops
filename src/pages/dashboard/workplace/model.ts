/*
 * @Author: Cookie
 * @Date: 2020-08-06 21:46:04
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 21:31:03
 * @Description:
 */
import { Effect, Reducer } from 'umi';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data';
import { queryCurrent } from '@/services/user';
import { queryProject } from '@/services/project';

export interface ModalState {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    save: Reducer<ModalState>;
    clear: Reducer<ModalState>;
  };
  effects: {
    init: Effect;
    fetchUserCurrent: Effect;
    fetchProjectNotice: Effect;
    fetchActivitiesList: Effect;
    fetchChart: Effect;
  };
}

const Model: ModelType = {
  namespace: 'dashboardAndworkplace',
  state: {
    currentUser: undefined,
    projectNotice: [],
    activities: [],
    radarData: [],
  },
  effects: {
    *init(_, { put }) {
      yield put({ type: 'fetchUserCurrent' });
      yield put({ type: 'fetchProjectNotice' });
    },
    *fetchUserCurrent(_, { call, put }) {
      const { data } = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: data,
        },
      });
    },
    *fetchProjectNotice(_, { call, put }) {
      const { data } = yield call(queryProject, { pageSize: 9, pageNum: 1 });
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(data) ? data : [],
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        currentUser: undefined,
        projectNotice: [],
        activities: [],
        radarData: [],
      };
    },
  },
};

export default Model;
