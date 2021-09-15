import {postTypes} from '../../../store/action_types/usersTypes';
import {
  FetchPostRequest,
  FetchPostsFilturePayload,
  FetchPostsSuccessPayload,
  FetchPostSuccess,
  FetchPostFailture,
} from '../../../store/types/post_types';

export const fecthPostRequest = (): FetchPostRequest => ({
  type: postTypes.FETCH_POST_REQUEST,
});

export const fetchPostsSuccess = (
  payload: FetchPostsSuccessPayload,
): FetchPostSuccess => ({
  type: postTypes.FETCH_POST_SUCCESS,
  payload,
});
export const fetchPostsFailure = (
  payload: FetchPostsFilturePayload,
): FetchPostFailture => ({
  type: postTypes.FETCH_POST_FAILURE,
  payload,
});
