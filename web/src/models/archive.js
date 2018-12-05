import { Archive } from '@/services/api';

export default {
  namespace: 'archive',

  state: {
    data: {},
  },

  effects: {
    * getArchive({}, { call, put }) {
      const data = yield call(Archive);
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
