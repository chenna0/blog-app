import {all} from 'redux-saga/effects';
import auth from 'saga/Boarding/boardingSaga';
import blogSaga from 'saga/BlogList/blogSaga';
import blogPageSaga from 'saga/BlogPage/blogPageSaga';


export default function* rootSaga(){
  yield all([
    auth(),
    blogSaga(),
    blogPageSaga(),
  ]);
}
