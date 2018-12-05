import request from '@/utils/request';

export async function Login(params) {
  return request('/api/account/login/', {
    method: 'POST',
    body: params,
  });
}

export async function UserDetail() {
  return request('/api/account/detail/', {
    isAuth: true,
  });
}

export async function Links() {
  return request('/api/link/');
}

export async function Tags() {
  return request('/api/tag/');
}

export async function HotArticles() {
  return request('/api/article/hot/');
}

export async function SeriesArticles() {
  return request('/api/article/series/');
}

export async function Articles() {
  return request('/api/article/');
}

export async function Archive() {
  return request('/api/article/archive/');
}
