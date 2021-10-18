import {call, put} from '@redux-saga/core/effects';
import axios from 'axios';
import {api} from '../../../../network/api_request';
import {
  getChatByIdFailture,
  getChatByIdSuccess,
} from '../../chats_actions/chat_actions';
const getChatByIdRequest = (id: string) =>
  axios.get(api.chats + id).then((response: any) => {
    return response.data.data;
  });

export function* getChatById(payload: any) {
  const {id} = payload;
  try {
    const response: ReturnType<typeof getChatByIdRequest> = yield call(
      getChatByIdRequest,
      id,
    );
    yield put(getChatByIdSuccess({chat_id: response}));
  } catch (e) {
    yield put(
      getChatByIdFailture({
        errors: e,
      }),
    );
  }
}
