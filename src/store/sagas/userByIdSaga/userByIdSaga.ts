import {call, put} from '@redux-saga/core/effects';
import axios from 'axios';
import {api} from '../../../network/api_request';
import {
  fetchUserByIdFailture,
  fetchUserByIdSuccess,
} from '../../../store/actions/userByIdActions/userByIdActions';

const getUserByIdService = (id: string) =>
  axios.get(api.users + '/' + id).then((response: any) => {
    return response.data.data;
  });

export function* getUserById(payload: any) {
  const {id} = payload;
  try {
    const response: ReturnType<typeof getUserByIdService> = yield call(
      getUserByIdService,
      id,
    );
    yield put(
      fetchUserByIdSuccess({
        id_data: response,
      }),
    );
  } catch (error) {
    yield put(
      fetchUserByIdFailture({
        error: error,
      }),
    );
  }
}
