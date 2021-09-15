import axios from 'axios';
import {call, put} from 'redux-saga/effects';
import {
  authUserFailture,
  authUserSuccess,
} from '../../../store/actions/authActions/authActions';
import {api} from '../../../network/api_request';

import {
  registUserFailture,
  registUserSuccess,
} from '../../../store/actions/authActions/registActions';
import {AuthTokenUser, RegistIdUser} from '../../../models/models';
import {setValueStorage} from '../../../storage/storage';

const registerUserService = (request: any) =>
  axios
    .post<RegistIdUser[]>(api.users, request)
    .then(response => {
      setValueStorage('user_id', response.data.id).then();
      return response;
    })
    .then(response => {
      return response.data;
    });

const authorizationService = (request: any) =>
  axios
    .post<AuthTokenUser[]>(api.auth, request)
    .then(response => {
      return response;
    })
    .then(response => {
      setValueStorage('tokenAuth', response.data.accessToken).then(() => {
        const auth = 'Bearer ' + response.data.accessToken;
        setValueStorage('header_auth', auth).then();
      });
      return response.data;
    });

export function* authorizationUser(payload: any) {
  try {
    const response: ReturnType<typeof authorizationService> = yield call(
      authorizationService,
      payload,
    );
    yield put(
      authUserSuccess({
        data_auth: response,
        auth_access: true,
      }),
    );
  } catch (error) {
    yield put(
      authUserFailture({
        error: error.message,
        auth_access: false,
      }),
    );
  }
}

export function* registrationUser(payload: any) {
  try {
    const response: ReturnType<typeof registerUserService> = yield call(
      registerUserService,
      payload,
    );
    yield put(
      registUserSuccess({
        data: response,
      }),
    );
  } catch (error) {
    yield put(
      registUserFailture({
        errors: error,
      }),
    );
  }
}
