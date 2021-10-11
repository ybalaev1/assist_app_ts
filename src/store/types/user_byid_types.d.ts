import {userByIdTypes} from '../action_types/userByIdTypes';

export interface FetchUserByIdSuccessPayload {
  id_data: any;
}

export interface FetchUserByIdFailturePayload {
  error: any;
}

export interface FetchUserByIdRequest {
  type: typeof userByIdTypes.USER_BY_ID_REQUEST;
  id: string;
}
export type FetchUserByIdSuccess = {
  type: typeof userByIdTypes.USER_BY_ID_SUCCESS;
  payload: FetchUserByIdSuccessPayload;
};

export type FetchUserByIdFailture = {
  type: typeof userByIdTypes.USER_BY_ID_FAILURE;
  payload: FetchUserByIdFailturePayload;
};

export type UserByIdActions =
  | FetchUserByIdRequest
  | FetchUserByIdSuccess
  | FetchUserByIdFailture;
