import request from '@/utils/request';

export async function Login(params) {
  return request('/api/account/login/', {
    method: 'POST',
    body: params,
  });
}
