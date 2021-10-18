import {postTypes} from '../action_types/usersTypes';

export interface FetchPostsSuccessPayload {
  posts: any;
}
export interface FetchPostsFilturePayload {
  error: string[] | any;
}
export interface FetchPostRequest {
  type: typeof postTypes.FETCH_POST_REQUEST;
}
export interface FetchPostSuccess {
  type: typeof postTypes.FETCH_POST_SUCCESS;
  payload: FetchPostsSuccessPayload;
}
export interface FetchPostFailture {
  type: typeof postTypes.FETCH_POST_FAILURE;
  payload: FetchPostsFilturePayload;
}

export type PostActions =
  | FetchPostRequest
  | FetchPostSuccess
  | FetchPostFailture;
