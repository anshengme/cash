import { AdminLinks, createLink } from '@/services/api';

export default {
  namespace: 'adminLink',

  state: {
    loading: false,
    data: {
      data: [],
      page: 1,
      limit: 10,
      total: 0,
    },
  },

  effects: {
    * getLinks({}, { call, put }) {
      const data = yield call(AdminLinks);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },
    * create({ payload }, { call }) {
      yield call(createLink, payload);
    },
    * update({ payload }, { call }) {
      console.log(payload);
      // yield call(createLink, payload);
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
