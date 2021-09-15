import {postTypes} from '../../../store/action_types/usersTypes';
import {PostActions} from '../../../store/types/post_types';

const initial_State = {
  pending: false,
  posts: [],
  error: null,
};
export default (state = initial_State, action: PostActions) => {
  switch (action.type) {
    case postTypes.FETCH_POST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case postTypes.FETCH_POST_SUCCESS:
      const ar = action.payload.posts;
      const filter = ar.sort(
        (a: {createdAt: number}, b: {createdAt: number}) => {
          return b.createdAt - a.createdAt;
        },
      );
      return {
        ...state,
        pending: false,
        posts: filter,
        error: null,
      };
    case postTypes.FETCH_POST_FAILURE:
      return {
        ...state,
        pending: false,
        posts: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
