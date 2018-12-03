import { TOKEN_NAME } from '@/config';

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token) {
  return localStorage.setItem(TOKEN_NAME, token);
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_NAME);
}
