import {postByIdTypes} from '../../../store/action_types/usersTypes';
import {
  FetchPostByIdRequest,
  FetchPostByIdSuccess,
  FetchPostByIdFailturePayload,
  FetchPostByIdSuccessPayload,
  FetchPostByIdFailture,
} from 'src/store/types/post_byid_types';

export const fetchPostByIdRequest = (id: string): FetchPostByIdRequest => ({
  type: postByIdTypes.FETCH_POST_BY_ID_REQUEST,
  id: id,
});

export const fetchPostByIdSuccess = (
  payload: FetchPostByIdSuccessPayload,
): FetchPostByIdSuccess => ({
  type: postByIdTypes.FETCH_POST_BY_ID_SUCCESS,
  payload,
});

export const fetchPostByIdFailture = (
  payload: FetchPostByIdFailturePayload,
): FetchPostByIdFailture => ({
  type: postByIdTypes.FETCH_POST_BY_ID_FAILURE,
  payload,
});
