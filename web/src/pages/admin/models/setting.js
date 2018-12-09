import { adminSetting, adminUpdateSetting } from '@/services/api';

export default {
  namespace: 'adminSetting',

  state: {
    data: {},
  },

  effects: {
    * get({}, { call, put }) {
      const data = yield call(adminSetting);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },
    * update({ payload }, { call, put }) {
      const data = yield call(adminUpdateSetting, payload);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
