import axios from 'axios';
import {User} from '../../../models/models';
import {api} from '../../../network/api_request';
import {call, put} from 'redux-saga/effects';
import {
  fetchUsersFailture,
  fetchUsersSuccess,
} from '../../../store/actions/usersActions/usersActions';

const getUserService = () =>
  axios.get<User[]>(api.users).then((response: any) => {
    return response.data;
  });

export function* getUsers() {
  try {
    const response: ReturnType<typeof getUserService> = yield call(
      getUserService,
    );
    yield put(
      fetchUsersSuccess({
        users: response,
      }),
    );
  } catch (e) {
    yield put(
      fetchUsersFailture({
        error: e.message,
      }),
    );
  }
}
