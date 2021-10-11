import {activityTypes} from '../../../store/action_types/activityTypes';
import {SubcribeActions} from '../../../store/types/activitiesTypes';

const initState = {
  loading: false,
  subcribe: [],
  error: null,
};

export default (state = initState, action: SubcribeActions) => {
  switch (action.type) {
    case activityTypes.FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case activityTypes.FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        subcribe: action.payload.subscribe,
        error: null,
      };
    case activityTypes.FOLLOW_FAILTURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {...state};
  }
};
