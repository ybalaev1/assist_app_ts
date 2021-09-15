import {User} from '../../models/models';
import {usersTypes} from '../action_types/usersTypes';

export interface UserState {
  pending: boolean;
  users: User[];
  error: string[] | null;
}

export interface FetchUsersSuccessPayload {
  users: any;
}

export interface FetchUsersFailturePayload {
  error: string;
}

export interface FetchUsersRequest {
  type: typeof usersTypes.FETCH_USER_REQUEST;
}

export type FetchUsersSuccess = {
  type: typeof usersTypes.FETCH_USER_SUCCESS;
  payload: FetchUsersSuccessPayload;
};

export type FetchUsersFailture = {
  type: typeof usersTypes.FETCH_USER_FAILURE;
  payload: FetchUsersFailturePayload;
};

export type UsersActions =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailture;
