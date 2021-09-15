import {personalTypes} from '../action_types/usersTypes';

export interface FetchPersonalSuccessPayload {
  personal: any;
}

export interface FetchPersonalFailturePayload {
  error: any;
}

export interface FetchPersonalRequest {
  type: typeof personalTypes.FETCH_PERSONAL_REQUEST;
  id: string;
}

export type FetchPersonalSuccess = {
  type: typeof personalTypes.FETCH_PERSONAL_SUCCESS;
  payload: FetchPersonalSuccessPayload;
};

export type FetchPersonalFailture = {
  type: typeof personalTypes.FETCH_PERSONAL_FAILURE;
  payload: FetchPersonalFailturePayload;
};

export type PersonalActions =
  | FetchPersonalRequest
  | FetchPersonalSuccess
  | FetchPersonalFailture;
