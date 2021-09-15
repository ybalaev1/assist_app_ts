import {
  FetchPersonalRequest,
  FetchPersonalFailture,
  FetchPersonalSuccessPayload,
  FetchPersonalSuccess,
  FetchPersonalFailturePayload,
} from '../../../store/types/personalTypes';
import {personalTypes} from '../../action_types/usersTypes';

export const fetchPersonalRequest = (id: string): FetchPersonalRequest => ({
  type: personalTypes.FETCH_PERSONAL_REQUEST,
  id: id,
});

export const fetchPersonalSuccess = (
  payload: FetchPersonalSuccessPayload,
): FetchPersonalSuccess => ({
  type: personalTypes.FETCH_PERSONAL_SUCCESS,
  payload,
});

export const fetchPersonalFailture = (
  payload: FetchPersonalFailturePayload,
): FetchPersonalFailture => ({
  type: personalTypes.FETCH_PERSONAL_FAILURE,
  payload,
});
