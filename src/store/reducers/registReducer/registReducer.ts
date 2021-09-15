import {registUserTypes} from '../../action_types/usersTypes';
import {RegistActions} from '../../actions/authActions/registActions';
export default (state = [], action: RegistActions) => {
  switch (action.type) {
    case registUserTypes.REGISTRATION_USER_SUCCESS:
      return {...state, data: action.payload.data};

    case registUserTypes.REGISTRATION_USER_FAILTURE:
      return {...state, errors: action.payload.errors};

    default:
      return {
        ...state,
      };
  }
};
