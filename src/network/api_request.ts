import {API_HOST, TARGET, API_LOCAL} from '@env';
const api = {
  auth: TARGET === 'DEV' ? API_LOCAL + 'auth' : API_HOST + 'auth',
  users: TARGET === 'DEV' ? API_LOCAL + 'users' : API_HOST + 'users',
  news: TARGET === 'DEV' ? API_LOCAL + 'news' : API_HOST + 'news',
  chats: TARGET === 'DEV' ? API_LOCAL + 'chats' : API_HOST + 'chats',
};
export {api};
