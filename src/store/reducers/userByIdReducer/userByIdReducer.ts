import {userByIdTypes} from '../../../store/action_types/userByIdTypes';
import {UserByIdActions} from '../../../store/types/user_byid_types';

const initialState = {
  load_user: false,
  id_data: [],
  errors: null,
};

export default (state = initialState, action: UserByIdActions) => {
  switch (action.type) {
    case userByIdTypes.USER_BY_ID_REQUEST:
      return {...state, load_user: true};
    case userByIdTypes.USER_BY_ID_SUCCESS:
      return {...state, load_user: false, id_data: action.payload.id_data};
    case userByIdTypes.USER_BY_ID_FAILURE:
      return {...state, load_user: false, errors: action.payload.error};
    default:
      return {...state};
  }
};
