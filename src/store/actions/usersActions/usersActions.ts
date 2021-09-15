import {usersTypes} from '../../action_types/usersTypes';
import {
  FetchUsersFailture,
  FetchUsersFailturePayload,
  FetchUsersRequest,
  FetchUsersSuccess,
  FetchUsersSuccessPayload,
} from '../../types/types';

export const fetchUsersRequest = (): FetchUsersRequest => ({
  type: usersTypes.FETCH_USER_REQUEST,
});

export const fetchUsersSuccess = (
  payload: FetchUsersSuccessPayload,
): FetchUsersSuccess => ({
  type: usersTypes.FETCH_USER_SUCCESS,
  payload,
});

export const fetchUsersFailture = (
  payload: FetchUsersFailturePayload,
): FetchUsersFailture => ({
  type: usersTypes.FETCH_USER_FAILURE,
  payload,
});
