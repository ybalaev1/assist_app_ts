import {userByIdTypes} from '../../../store/action_types/userByIdTypes';
import {
  FetchUserByIdFailture,
  FetchUserByIdFailturePayload,
  FetchUserByIdRequest,
  FetchUserByIdSuccess,
  FetchUserByIdSuccessPayload,
} from '../../../store/types/user_byid_types';

export const fetchUserById = (id: string): FetchUserByIdRequest => ({
  type: userByIdTypes.USER_BY_ID_REQUEST,
  id: id,
});

export const fetchUserByIdSuccess = (
  payload: FetchUserByIdSuccessPayload,
): FetchUserByIdSuccess => ({
  type: userByIdTypes.USER_BY_ID_SUCCESS,
  payload,
});

export const fetchUserByIdFailture = (
  payload: FetchUserByIdFailturePayload,
): FetchUserByIdFailture => ({
  type: userByIdTypes.USER_BY_ID_FAILURE,
  payload,
});
