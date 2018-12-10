import { articleDetail, articleDetailComment, createComment } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'articleDetail',

  state: {
    article: {},
    comments: [],
  },

  effects: {
    * get({ payload }, { call, put }) {
      const article = yield call(articleDetail, payload);
      yield put({
        type: 'setState',
        payload: { article },
      });
    },
    * getComments({ payload }, { call, put }) {
      const comments = yield call(articleDetailComment, payload);
      yield put({
        type: 'setState',
        payload: { comments },
      });
    },
    * createComment({ payload, callback }, { call, put, select }) {
      const { comments, article: { id } } = yield select(state => state.articleDetail);
      const comment = yield call(createComment, payload = { article: id, ...payload });
      message.success('添加成功');
      callback();
      if (Array.isArray(comment)) {
        yield put({
          type: 'setState',
          payload: { comments: comment },
        });
      } else {
        yield put({
          type: 'setState',
          payload: { comments: [...comments, comment] },
        });
      }
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
