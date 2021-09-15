import axios from 'axios';
import {IPost} from '../../../models/models';
import {api} from '../../../network/api_request';
import {call, put} from 'redux-saga/effects';

import {
  fetchPostsFailure,
  fetchPostsSuccess,
} from '../../../store/actions/postActions/postActions';

const getPostsService = () =>
  axios.get<IPost[]>(api.news).then((response: any) => {
    return response.data.posts;
  });

export function* getPosts() {
  try {
    const response: ReturnType<typeof getPostsService> = yield call(
      getPostsService,
    );
    yield put(
      fetchPostsSuccess({
        posts: response,
      }),
    );
  } catch (e) {
    yield put(
      fetchPostsFailure({
        error: e.message,
      }),
    );
  }
}
