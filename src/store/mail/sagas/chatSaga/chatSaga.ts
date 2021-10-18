import {call, put} from '@redux-saga/core/effects';
import axios from 'axios';
import {api} from '../../../../network/api_request';
import {
  getChatsFailture,
  getChatsSuccess,
} from '../../chats_actions/chat_actions';
import {ChatModel} from '../../model/mail.model';

const getChatsRequestService = () =>
  axios.get<ChatModel[]>(api.chats).then((response: any) => {
    return response.data.data;
  });

export function* getChats() {
  try {
    const response: ReturnType<typeof getChatsRequestService> = yield call(
      getChatsRequestService,
    );
    yield put(
      getChatsSuccess({
        chats: response,
      }),
    );
  } catch (e) {
    yield put(
      getChatsFailture({
        errors: e,
      }),
    );
  }
}
