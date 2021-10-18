import {combineReducers} from 'redux';
import themeModSlice from '../../types/theme/themeMod.slice';
import store from '../Store';
import authReducer from './authReducer/authReducer';
import personalReducer from './personalReducer/personalReducer';
import postByIdReducer from './postByIdReducer/postByIdReducer';
import postReducer from './postReducer/postReducer';
import registReducer from './registReducer/registReducer';
import userReduser from './usersReduser/userReduser';
import activitiesReducer from './activitiesReducer/activitiesReducer';
import userByIdReducer from './userByIdReducer/userByIdReducer';
import chatReducer from '../mail/reducers/chatReducer/chatReducer';
import chatByIdReducer from '../mail/reducers/chatByIdReducer/chatByIdReducer';
import messagesReducer from '../mail/reducers/messageReducer/messageReducer';

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReduser,
  themeMode: themeModSlice,
  auth: authReducer,
  regist: registReducer,
  personal: personalReducer,
  postById: postByIdReducer,
  subscribe: activitiesReducer,
  user_byId: userByIdReducer,
  chats: chatReducer,
  chat_id: chatByIdReducer,
  messages: messagesReducer,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
