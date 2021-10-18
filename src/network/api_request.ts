import {API_HOST, TARGET, API_LOCAL} from '@env';
const TARGET_ENV = TARGET;
const api = {
  auth: TARGET_ENV === 'DEV' ? API_LOCAL + 'auth' : API_HOST + 'auth',
  users: TARGET_ENV === 'DEV' ? API_LOCAL + 'users' : API_HOST + 'users',
  news: TARGET_ENV === 'DEV' ? API_LOCAL + 'news' : API_HOST + 'news',
  chats: TARGET_ENV === 'DEV' ? API_LOCAL + 'chats/' : API_HOST + 'chats',
};
export {api};
