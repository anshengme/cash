import { message } from 'antd';
import { AdminUser, updateUser } from '@/services/api';

export default {
  namespace: 'adminUser',

  state: {
    data: {
      data: [],
      total: 0,
    },
    searchData: {},
  },

  effects: {
    * get({ payload }, { call, put }) {
      const data = yield call(AdminUser, payload);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },

    * update({ payload, id }, { call }) {
      yield call(updateUser, payload, id);
      message.success('更修改成功');
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
