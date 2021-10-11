import axios from 'axios';
import {call, put} from 'redux-saga/effects';
import {
  fetchPostByIdFailture,
  fetchPostByIdSuccess,
} from '../../../store/actions/postByIdActions/postByIdActions';
import {IPost} from '../../../models/models';
import {api} from '../../../network/api_request';
const getPostByIdService = (id: string) =>
  axios.get<IPost[]>(api.users + '/' + id + '/posts').then((response: any) => {
    return response.data.posts;
  });

export function* getPostById(payload: any) {
  const {id} = payload;
  try {
    const response: ReturnType<typeof getPostByIdService> = yield call(
      getPostByIdService,
      id,
    );
    yield put(
      fetchPostByIdSuccess({
        data: response,
      }),
    );
  } catch (error) {
    fetchPostByIdFailture({
      error: error,
    });
  }
}
