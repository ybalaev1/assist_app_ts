import {takeLatest} from 'redux-saga/effects';
import {activityTypes} from '../action_types/activityTypes';
import {userByIdTypes} from '../action_types/userByIdTypes';
import {
  authUserTypes,
  personalTypes,
  postByIdTypes,
  postTypes,
  registUserTypes,
  usersTypes,
} from '../action_types/usersTypes';
import {subscribeUser} from './activitySaga/activitySaga';
import {authorizationUser, registrationUser} from './authSaga/authSaga';
import {getPersonal} from './personalSaga/personalSaga';
import {getPostById} from './postByIdSaga/postByIdSaga';
import {getPosts} from './postSaga/postSaga';
import {getUserById} from './userByIdSaga/userByIdSaga';
import {getUsers} from './userSaga/userSaga';

export function* rootSaga() {
  yield takeLatest(registUserTypes.REGISTRATION_USER, registrationUser);
  yield takeLatest(authUserTypes.AUTH_USER, authorizationUser);
  yield takeLatest(postTypes.FETCH_POST_REQUEST, getPosts);
  yield takeLatest(usersTypes.FETCH_USER_REQUEST, getUsers);
  yield takeLatest(personalTypes.FETCH_PERSONAL_REQUEST, getPersonal);
  yield takeLatest(postByIdTypes.FETCH_POST_BY_ID_REQUEST, getPostById);
  yield takeLatest(activityTypes.FOLLOW_REQUEST, subscribeUser);
  yield takeLatest(userByIdTypes.USER_BY_ID_REQUEST, getUserById);
}
