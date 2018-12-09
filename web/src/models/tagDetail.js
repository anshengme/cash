import { tagArticles } from '@/services/api';

export default {
  namespace: 'tagDetail',

  state: {
    articles: [],
  },

  effects: {
    * get({ payload }, { call, put }) {
      const articles = yield call(tagArticles, payload);
      yield put({
        type: 'setState',
        payload: { articles },
      });
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
