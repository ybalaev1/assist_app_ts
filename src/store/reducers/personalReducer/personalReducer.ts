import {personalTypes} from '../../../store/action_types/usersTypes';
import {PersonalActions, UserState} from '../../../store/types/personalTypes';
const initialState: UserState = {
  pending: false,
  personal: [],
  error: null,
};

export default (state = initialState, action: PersonalActions) => {
  switch (action.type) {
    case personalTypes.FETCH_PERSONAL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case personalTypes.FETCH_PERSONAL_SUCCESS:
      return {
        ...state,
        pending: false,
        personal: action.payload.personal.data,
        error: null,
      };
    case personalTypes.FETCH_PERSONAL_FAILURE:
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
