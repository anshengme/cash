import { message } from 'antd';
import { AdminLinks, createLink, updateLink } from '@/services/api';

export default {
  namespace: 'adminLink',

  state: {
    loading: false,
    data: {
      data: [],
      total: 0,
    },
    linkDetail: {},
    searchData: {},
  },

  effects: {
    * get({ payload }, { call, put }) {
      const data = yield call(AdminLinks, payload);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },

    * create({ payload, callback }, { call }) {
      yield call(createLink, payload);
      message.success('添加成功');
      callback();
    },

    * update({ payload, callback }, { call, select }) {
      const { linkDetail: { id } } = yield select(state => state.adminLink);
      yield call(updateLink, payload, id);
      message.success('更修改成功');
      callback();
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
