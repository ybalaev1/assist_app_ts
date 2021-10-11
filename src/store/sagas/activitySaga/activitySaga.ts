import {call, put} from '@redux-saga/core/effects';
import axios from 'axios';
import {
  subscribeFailture,
  subscribeSuccess,
} from '../../../store/actions/activitesActions/activitesActions';
import {api} from '../../../network/api_request';

const subscribeUserService = (id: string, id_follow: string) =>
  axios
    .patch(api.users + '/' + id + '/followers', id_follow)
    .then((response: any) => {
      return response.data;
    });

export function* subscribeUser(payload: any) {
  const {id, id_follow} = payload;
  try {
    const response: ReturnType<typeof subscribeUserService> = yield call(
      subscribeUserService,
      id,
      id_follow,
    );
    yield put(
      subscribeSuccess({
        subscribe: response,
      }),
    );
  } catch (error) {
    yield put(
      subscribeFailture({
        error: error,
      }),
    );
  }
}
