import {AuthActions} from '../../../store/actions/authActions/authActions';
import {authUserTypes} from '../../../store/action_types/usersTypes';

export default (state = [], action: AuthActions) => {
  switch (action.type) {
    case authUserTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        data_auth: action.payload,
        auth_access: true,
      };

    case authUserTypes.AUTH_USER_FAILTURE:
      return {...state, error: action.payload.error, auth_access: false};

    default:
      return {
        ...state,
      };
  }
};
