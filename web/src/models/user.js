import { Login, UserDetail } from '@/services/api';
import { getToken, setToken, removeToken } from '@/utils/token';

export default {
  namespace: 'user',

  state: {
    userDetail: undefined,
  },

  effects: {
    * login({ payload }, { call }) {
      const response = yield call(Login, payload);
      // Login successfully
      if (response.token) {
        setToken(response.token);
        alert('登录成功!');
        window.location.reload();
      }
    },
    * logout({}, { call }) {
      removeToken();
      window.location.reload();
    },
    * getUserDetail({}, { call, put }) {
      if (getToken()) {
        const userDetail = yield call(UserDetail);
        if (userDetail) {
          yield put({
            type: 'setState',
            payload: { userDetail },
          });
        }
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
