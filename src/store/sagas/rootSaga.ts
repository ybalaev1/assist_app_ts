import {takeLatest} from 'redux-saga/effects';
import {
  authUserTypes,
  personalTypes,
  postByIdTypes,
  postTypes,
  registUserTypes,
  usersTypes,
} from '../action_types/usersTypes';
import {authorizationUser, registrationUser} from './authSaga/authSaga';
import {getPersonal} from './personalSaga/personalSaga';
import {getPostById} from './postByIdSaga/postByIdSaga';
import {getPosts} from './postSaga/postSaga';
import {getUsers} from './userSaga/userSaga';

export function* rootSaga() {
  yield takeLatest(registUserTypes.REGISTRATION_USER, registrationUser);
  yield takeLatest(authUserTypes.AUTH_USER, authorizationUser);
  yield takeLatest(postTypes.FETCH_POST_REQUEST, getPosts);
  yield takeLatest(usersTypes.FETCH_USER_REQUEST, getUsers);
  yield takeLatest(personalTypes.FETCH_PERSONAL_REQUEST, getPersonal);
  yield takeLatest(postByIdTypes.FETCH_POST_BY_ID_REQUEST, getPostById);
}
