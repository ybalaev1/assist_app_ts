import {getValueStorage} from '../../../storage/storage';
import {usersTypes} from '../../action_types/usersTypes';
import {UserState, UsersActions} from '../../types/types';
const initialState: UserState = {
  pending: false,
  users: [],
  error: null,
};
const current_id = getValueStorage('user_id').then();
export default (state = initialState, action: UsersActions) => {
  switch (action.type) {
    case usersTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case usersTypes.FETCH_USER_SUCCESS:
      const id = current_id._W;
      const data = action.payload.users.data;
      const filter = data.filter((a: {_id: string}) => {
        return a._id !== id;
      });
      return {
        ...state,
        pending: false,
        users: filter,
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
