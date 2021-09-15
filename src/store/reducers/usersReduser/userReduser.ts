import {usersTypes} from '../../action_types/usersTypes';
import {UserState, UsersActions} from '../../types/types';
const initialState: UserState = {
  pending: false,
  users: [],
  error: null,
};

export default (state = initialState, action: UsersActions) => {
  switch (action.type) {
    case usersTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case usersTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        users: action.payload.users.data,
        error: null,
      };
    case usersTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        pending: false,
        users: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
