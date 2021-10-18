import {all, takeLatest} from '@redux-saga/core/effects';
import {chatsTypes} from '../action/action_mail_types';
import {getChats} from './chatSaga/chatSaga';

export function* mailSaga() {
  yield all([takeLatest(chatsTypes.CHATS_REQUEST, getChats)]);
}
