import { Links, Tags, HotArticles, SeriesArticles, Articles } from '@/services/api';

export default {
  namespace: 'index',

  state: {
    links: [],
    tags: [],
    articles: {
      data: [],
    },
    hotArticles: [],
    seriesArticles: [],
  },

  effects: {
    * getHotArticles({}, { call, put }) {
      const hotArticles = yield call(HotArticles);
      yield put({
        type: 'setState',
        payload: { hotArticles },
      });
    },
    * getArticles({}, { call, put }) {
      const articles = yield call(Articles);
      yield put({
        type: 'setState',
        payload: { articles },
      });
    },
    * getSeriesArticles({}, { call, put }) {
      const seriesArticles = yield call(SeriesArticles);
      yield put({
        type: 'setState',
        payload: { seriesArticles },
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
