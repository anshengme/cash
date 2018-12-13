import { adminArticleCreateTags, adminArticleCreate } from '@/services/api';
import { Modal } from 'antd';

export default {
  namespace: 'adminArticleCreate',

  state: {
    tags: [],
  },

  effects: {
    * getTags({}, { call, put }) {
      const tags = yield call(adminArticleCreateTags);
      yield put({
        type: 'setState',
        payload: { tags },
      });
    },
    * create({ payload }, { call }) {
      yield call(adminArticleCreate, payload);
      Modal.info({
        title: '创建成功',
        onOk() {
          window.location.reload();
        },
      });
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
