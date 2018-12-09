import { articleDetail } from '@/services/api';

export default {
  namespace: 'articleDetail',

  state: {
    article: {},
  },

  effects: {
    * get({ payload }, { call, put }) {
      const article = yield call(articleDetail, payload);
      yield put({
        type: 'setState',
        payload: { article },
      });
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
