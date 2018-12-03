import { Login } from '@/services/api';
import { setToken } from '@/utils/token';

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({ payload }, { call }) {
      const response = yield call(Login, payload);
      console.log(response);

      // Login successfully
      if (response.token) {
        console.log('登录成功');
        setToken(payload.token);
      }
    },
  },
};
