import {postByIdTypes} from '../action_types/usersTypes';

export interface FetchPostByIdSuccessPayload {
  post: any;
}
export interface FetchPostByIdFailturePayload {
  error: any;
}
export interface FetchPostByIdRequest {
  type: typeof postByIdTypes.FETCH_POST_BY_ID_REQUEST;
  id: string;
}
export interface FetchPostByIdSuccess {
  type: typeof postByIdTypes.FETCH_POST_BY_ID_SUCCESS;
  payload: FetchPostByIdSuccessPayload;
}
export interface FetchPostByIdFailture {
  type: typeof postByIdTypes.FETCH_POST_BY_ID_FAILURE;
  payload: FetchPostByIdFailturePayload;
}

export type PostByIdActions =
  | FetchPostByIdRequest
  | FetchPostByIdSuccess
  | FetchPostByIdFailture;
