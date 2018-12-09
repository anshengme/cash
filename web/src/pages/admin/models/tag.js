import { message } from 'antd';
import { AdminTags, createTag, updateTag } from '@/services/api';

export default {
  namespace: 'adminTag',

  state: {
    loading: false,
    data: {
      data: [],
      total: 0,
    },
    tagDetail: {},
    searchData: {},
  },

  effects: {
    * get({ payload }, { call, put }) {
      const data = yield call(AdminTags, payload);
      yield put({
        type: 'setState',
        payload: { data },
      });
    },

    * create({ payload, callback }, { call }) {
      yield call(createTag, payload);
      message.success('添加成功');
      callback();
    },

    * update({ payload, callback }, { call, select }) {
      const { tagDetail: { id } } = yield select(state => state.adminTag);
      yield call(updateTag, payload, id);
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
