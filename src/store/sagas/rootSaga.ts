import {takeLatest, all, debounce, takeEvery} from 'redux-saga/effects';
import {activityTypes} from '../action_types/activityTypes';
import {userByIdTypes} from '../action_types/userByIdTypes';
import {
  authUserTypes,
  personalTypes,
  postByIdTypes,
  postTypes,
  registUserTypes,
  usersTypes,
} from '../action_types/usersTypes';
import {
  chatsTypes,
  chatByIdTypes,
  messagesTypes,
} from '../mail/action/action_mail_types';
import {getChatById} from '../mail/sagas/chatByIdSaga/chatByIdSaga';
import {getChats} from '../mail/sagas/chatSaga/chatSaga';
import {getMessages} from '../mail/sagas/messageSaga/messageSaga';
import {subscribeUser} from './activitySaga/activitySaga';
import {authorizationUser, registrationUser} from './authSaga/authSaga';
import {getPersonal} from './personalSaga/personalSaga';
import {getPostById} from './postByIdSaga/postByIdSaga';
import {getPosts} from './postSaga/postSaga';
import {getUserById} from './userByIdSaga/userByIdSaga';
import {getUsers} from './userSaga/userSaga';

export function* rootSaga() {
  yield all([
    takeLatest(registUserTypes.REGISTRATION_USER, registrationUser),
    takeLatest(authUserTypes.AUTH_USER, authorizationUser),
    takeLatest(postTypes.FETCH_POST_REQUEST, getPosts),
    takeLatest(usersTypes.FETCH_USER_REQUEST, getUsers),
    takeLatest(personalTypes.FETCH_PERSONAL_REQUEST, getPersonal),
    debounce(3000, postByIdTypes.FETCH_POST_BY_ID_REQUEST, getPostById),
    takeLatest(activityTypes.FOLLOW_REQUEST, subscribeUser),
    takeLatest(userByIdTypes.USER_BY_ID_REQUEST, getUserById),
    takeLatest(chatsTypes.CHATS_REQUEST, getChats),
    takeLatest(chatByIdTypes.CHAT_BY_ID_REQUEST, getChatById),
    takeEvery(messagesTypes.MESSAGES_REQUEST, getMessages),
  ]);
}
