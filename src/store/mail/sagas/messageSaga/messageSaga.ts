import {call, put} from '@redux-saga/core/effects';
import axios from 'axios';
// import {api} from '../../../../network/api_request';
import {
  getMessagesSuccess,
  getMessagesFailture,
} from '../../message_actions/message_actions';

const getMessagesRequest = (id: string) =>
  axios.get('http://localhost:3000/' + id).then((response: any) => {
    return response.data.conversation;
  });

export function* getMessages(payload: any) {
  const {id} = payload;
  try {
    const response: ReturnType<typeof getMessagesRequest> = yield call(
      getMessagesRequest,
      id,
    );
    yield put(
      getMessagesSuccess({
        messages: response,
      }),
    );
  } catch (e) {
    yield put(
      getMessagesFailture({
        errors: e,
      }),
    );
  }
}
