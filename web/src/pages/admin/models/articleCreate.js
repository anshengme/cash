import {
  adminArticleCreate,
  adminArticleCreateDetail,
  adminArticleCreateTags,
  adminArticleUpdate,
} from '@/services/api';
import { Modal } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

export default {
  namespace: 'adminArticleCreate',

  state: {
    tags: [],
    article: {},
    value: '',
    output: '',
  },

  effects: {
    * getTags({}, { call, put }) {
      const tags = yield call(adminArticleCreateTags);
      yield put({
        type: 'setState',
        payload: { tags },
      });
    },
    * create({ payload }, { call, select }) {
      const { article: { id } } = yield select(state => state.adminArticleCreate);
      if (id) {
        yield call(adminArticleUpdate, payload, id);
      } else {
        yield call(adminArticleCreate, payload);
      }
      Modal.info({
        title: '提交成功',
        onOk() {
          window.location.reload();
        },
      });
    },
    * getDetail({ payload }, { call, put }) {
      const article = yield call(adminArticleCreateDetail, payload);
      const { content } = article;
      yield put({
        type: 'setState',
        payload: {
          value: content,
          output: marked(content),
          article,
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
