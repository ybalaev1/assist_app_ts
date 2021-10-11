import {PostByIdActions} from '../../../store/types/post_byid_types';
import {postByIdTypes} from '../../../store/action_types/usersTypes';

const initState = {
  pending: false,
  data: [],
  error: null,
};

export default (state = initState, action: PostByIdActions) => {
  switch (action.type) {
    case postByIdTypes.FETCH_POST_BY_ID_REQUEST:
      return {...state, pending: true};
    case postByIdTypes.FETCH_POST_BY_ID_SUCCESS:
      const postData = action.payload.data;
      const filterPosts = postData.sort(
        (a: {createdAt: number}, b: {createdAt: number}) => {
          return b.createdAt - a.createdAt;
        },
      );
      return {...state, pending: false, data: filterPosts, error: null};
    case postByIdTypes.FETCH_POST_BY_ID_FAILURE:
      return {...state, pending: false, error: action.payload.error};
    default:
      return {...state};
  }
};
