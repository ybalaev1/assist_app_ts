import axios from 'axios';
import {User} from '../../../models/models';
import {api} from '../../../network/api_request';
import {call, put} from 'redux-saga/effects';

import {
  fetchPersonalFailture,
  fetchPersonalSuccess,
} from '../../../store/actions/presonalActions/presonalActions';

const getPersonalService = (payload: string) =>
  axios.get<User[]>(api.users + '/' + payload).then((response: any) => {
    return response.data;
  });

export function* getPersonal(payload: any) {
  const {id} = payload;
  try {
    const response: ReturnType<typeof getPersonalService> = yield call(
      getPersonalService,
      id,
    );
    yield put(
      fetchPersonalSuccess({
        personal: response,
      }),
    );
  } catch (e) {
    yield put(
      fetchPersonalFailture({
        error: e,
      }),
    );
  }
}
