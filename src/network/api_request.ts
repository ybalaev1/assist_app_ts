import {API_HOST, TARGET, API_LOCAL} from '@env';
import axios from 'axios';
import { getValueStorage } from '../storage/storage';
const TARGET_ENV = TARGET;
// const api = {
//   auth: TARGET_ENV === 'DEV' ? API_LOCAL + 'auth' : API_HOST + 'auth',
//   users: TARGET_ENV === 'DEV' ? API_LOCAL + 'users' : API_HOST + 'users',
//   news: TARGET_ENV === 'DEV' ? API_LOCAL + 'news' : API_HOST + 'news',
//   chats: TARGET_ENV === 'DEV' ? API_LOCAL + 'chats/' : API_HOST + 'chats',
// };
const api = {
  auth: API_HOST + 'auth',
  users: API_HOST + 'users',
  news: API_HOST + 'news',
  chats: API_HOST + 'chats/',
};
export {api};

export const createChat = (costumer: string) => {
  getValueStorage('user_id').then((user_id) => {
    const data = {
      'costumer': costumer,
      'initiator': user_id,
    }
   return axios.post(api.chats, {data}).then((result) => {
     return result;
   })
  })
}