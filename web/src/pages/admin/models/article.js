import { adminArticle } from '@/services/api';

export default {
  namespace: 'adminArticle',

  state: {
    data: {
      data: [],
      total: 0,
    },
    searchData: {},
  },

  effects: {
    * get({ payload }, { call, put }) {
      const data = yield call(adminArticle, payload);
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
