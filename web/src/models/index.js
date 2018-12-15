import { Links, Tags, HotArticles, TopicArticles, Articles } from '@/services/api';

export default {
  namespace: 'index',

  state: {
    links: [],
    tags: [],
    articles: {
      data: [],
    },
    hotArticles: [],
    topicArticles: [],
  },

  effects: {
    * getHotArticles({}, { call, put }) {
      const hotArticles = yield call(HotArticles);
      yield put({
        type: 'setState',
        payload: { hotArticles },
      });
    },
    * getArticles({}, { call, put, select }) {
      const { articles: { limit, total } } = yield select(state => state.index);
      let payload = {};
      if (limit && limit < total) {
        payload = { limit: limit + 10 };
      }
      const articles = yield call(Articles, payload);
      yield put({
        type: 'setState',
        payload: { articles },
      });
    },
    * getTopicArticles({}, { call, put }) {
      const topicArticles = yield call(TopicArticles);
      yield put({
        type: 'setState',
        payload: { topicArticles },
      });
    },
    * getLinks({}, { call, put }) {
      const links = yield call(Links);
      yield put({
        type: 'setState',
        payload: { links },
      });
    },

    * getTags({}, { call, put }) {
      const tags = yield call(Tags);
      yield put({
        type: 'setState',
        payload: { tags },
      });
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
