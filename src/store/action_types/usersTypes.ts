// eslint-disable-next-line no-shadow
enum usersTypes {
  FETCH_USER_REQUEST = 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'FETCH_USER_FAILURE',
}
// eslint-disable-next-line no-shadow
enum authUserTypes {
  AUTH_USER = 'AUTH_USER',
  AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS',
  AUTH_USER_FAILTURE = 'AUTH_USER_FAILTURE',
}
// eslint-disable-next-line no-shadow
enum registUserTypes {
  REGISTRATION_USER = 'REGISTRATION_USER',
  REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS',
  REGISTRATION_USER_FAILTURE = 'REGISTRATION_USER_FAILTURE',
}
// eslint-disable-next-line no-shadow
enum postTypes {
  FETCH_POST_REQUEST = 'FETCH_POST_REQUEST',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
  FETCH_POST_FAILURE = 'FETCH_POST_FAILURE',
}
// eslint-disable-next-line no-shadow
enum postByIdTypes {
  FETCH_POST_BY_ID_REQUEST = 'FETCH_POST_BY_ID_REQUEST',
  FETCH_POST_BY_ID_SUCCESS = 'FETCH_POST_BY_ID_SUCCESS',
  FETCH_POST_BY_ID_FAILURE = 'FETCH_POST_BY_ID_FAILURE',
}

// eslint-disable-next-line no-shadow
enum personalTypes {
  FETCH_PERSONAL_REQUEST = 'FETCH_PERSONAL_REQUEST',
  FETCH_PERSONAL_SUCCESS = 'FETCH_PERSONAL_SUCCESS',
  FETCH_PERSONAL_FAILURE = 'FETCH_PERSONAL_FAILURE',
}
export {
  usersTypes,
  authUserTypes,
  registUserTypes,
  postTypes,
  personalTypes,
  postByIdTypes,
};
