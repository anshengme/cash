import { stringify } from 'qs';
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

//  管理后台API

export async function AdminLinks(params) {
  return request(`/api/admin/link/?${stringify(params)}`, {
    isAuth: true,
  });
}

export async function createLink(params) {
  return request('/api/admin/link/', {
    method: 'POST',
    body: params,
    isAuth: true,
  });
}

export async function updateLink(params, id) {
  return request(`/api/admin/link/${id}/`, {
    method: 'PUT',
    body: params,
    isAuth: true,
  });
}

export async function AdminUser(params) {
  return request(`/api/admin/account/?${stringify(params)}`, {
    isAuth: true,
  });
}

export async function updateUser(params, id) {
  return request(`/api/admin/account/${id}/`, {
    method: 'PUT',
    body: params,
    isAuth: true,
  });
}

export async function adminArticle(params) {
  return request(`/api/admin/article/?${stringify(params)}`, {
    isAuth: true,
  });
}

export async function adminSetting() {
  return request('/api/admin/settings/', {
    isAuth: true,
  });
}

export async function adminUpdateSetting(params) {
  return request('/api/admin/settings/', {
    method: 'POST',
    body: params,
    isAuth: true,
  });
}

export async function articleDetail(url) {
  return request(`/api/article/${url}/`);
}
