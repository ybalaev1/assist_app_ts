import {API_HOST, API_LOCAL} from '@env';

const api = {
  auth: API_HOST + 'auth',
  users: API_HOST + 'users',
  news: API_HOST + 'news',
  news_local: API_LOCAL + 'news',
  users_local: API_LOCAL + 'users',
};
export {api};
