import {PostByIdActions} from '../../../store/types/post_byid_types';
import {postByIdTypes} from '../../../store/action_types/usersTypes';

const initState = {
  pending: false,
  post: [],
  error: null,
};

export default (state = initState, action: PostByIdActions) => {
  switch (action.type) {
    case postByIdTypes.FETCH_POST_BY_ID_REQUEST:
      return {...state, pending: true};
    case postByIdTypes.FETCH_POST_BY_ID_SUCCESS:
      return {...state, pending: false, post: action.payload.post, error: null};
    case postByIdTypes.FETCH_POST_BY_ID_FAILURE:
      return {...state, pending: false, error: action.payload.error};
    default:
      return {...state};
  }
};
