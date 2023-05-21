import {takeEvery, all, call, put} from 'redux-saga/effects';
import {store} from 'store/store';
import {getRequest} from 'common/utils/axiosClient';
import {getSideList, getSideListFailure, getSideListSuccess} from 'reducers/BlogPage/blogPageSlice';
import {errorNotification} from 'common/utils/common';


function* getBlogPageList(action) {
  try{
    const search = store.getState().BlogPage.searchParams;
    const pageSize = store.getState().BlogPage.pageSize;
    const offset = (store.getState().BlogPage.current - 1) *pageSize;
    const tableTotalResponse =
      yield call(()=>getRequest(`data/blog/count?where=isPublish%3Dtrue%20AND%20name%20LIKE%20'${search}%25'`));
    const response = yield call(()=>getRequest(`data/blog?pageSize=${pageSize}&offset=${offset}&where=isPublish%3Dtrue%20AND%20name%20LIKE%20'${search}%25'&sortBy=%60updated%60%20desc`));
    yield put(getSideListSuccess({total:tableTotalResponse.data,list:response.data}));
  }catch (e) {
    yield put(getSideListFailure());
    errorNotification(e);
  }
}



export default function * rootSaga() {
  yield all([
    takeEvery(getSideList,getBlogPageList),
  ])
}