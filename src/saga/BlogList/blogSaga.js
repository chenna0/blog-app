import {takeLatest, takeEvery, all, call, put} from 'redux-saga/effects';
import {
  createBlog,
  createBlogFailure,
  createBlogSuccess,
  deleteBlog,
  getBlogList,
  getBlogListFailure,
  getBlogListSuccess,
  getSingleBlogData,
  getSingleBlogDataFailure,
  getSingleBlogDataSuccess,
  publishData,
  publishDataFailure,
  publishDataSuccess,
  searchBlog,
  updateBlog,
  updateBlogFailure,
  updateBlogSuccess,
} from 'reducers/BlogList/blogSlice';
import {deleteRequest, getRequest, patchRequest, postRequest} from 'common/utils/axiosClient';
import {message} from 'antd';
import {store} from 'store/store';
import {errorNotification} from '../../common/utils/common';


function* addBlog(action){
  try {
    let headers={headers:{'Content-Type':'multipart/form-data'}};
    let formData = new FormData();
    formData.append('image',action.payload.image[0].originFileObj);
    const imageResponse = yield call(()=>postRequest(`files/images/${action.payload.image[0].uid}.jpg`,formData,headers));
    let data = {...action.payload,image:`${process.env.REACT_APP_HOST_URL}files/${imageResponse.data.filePath}`};
    const response = yield call(()=>postRequest('data/blog',data));
    yield put(createBlogSuccess(response.data));
    message.success('Blog Created Successfully!',2);
    yield put(getBlogList());
  }catch (e) {
    yield put(createBlogFailure());
    errorNotification(e);
  }
}


function* getBlogData(action) {
  try{
    const search = store.getState().Blog.searchParams;
    const ownerId = store.getState().Auth.userId;
    const pageSize = store.getState().Blog.pageSize;
    const offset = (store.getState().Blog.currentPage - 1) *pageSize;
    const tableTotalResponse =
      yield call(()=>getRequest(`data/blog/count?where=ownerId%3D'${ownerId}'AND%20name%20LIKE%20'${search}%25'`));
    const response = yield call(()=>getRequest(`data/blog?pageSize=${pageSize}&offset=${offset}&where=ownerId%3D'${ownerId}'AND%20name%20LIKE%20'${search}%25'&sortBy=%60created%60%20desc`));
    yield put(getBlogListSuccess({total:tableTotalResponse.data,list:response.data}));
  }catch (e) {
    yield put(getBlogListFailure());
    errorNotification(e);
  }
}

function* getSingleBlog(action) {
  try{
    const response = yield call(()=>getRequest(`data/blog?where=objectId%3D'${action.payload.id}'`));
    yield put(getSingleBlogDataSuccess(response.data[0]));
  }catch (e) {
    yield put(getSingleBlogDataFailure());
    errorNotification(e);
  }
}

function* deleteSingleBlog(action) {
  try {
    yield call(()=>deleteRequest(`data/blog/${action.payload.id}`));
    yield put(getBlogList());
    message.success('Blog Deleted Successfully!',3);
  }catch (e) {
    yield put(getBlogListFailure());
    errorNotification(e);
  }
}

function* publishBlogData(action) {
  try {
    let id = action.payload?.id ? action.payload?.id : store.getState().Blog.blogId;
    let data = {
      isPublish:action.payload?.id ?
        action.payload.isPublish :
        !store.getState().Blog.blogPublish,
    }

    yield call(()=>patchRequest(`data/blog/${id}`,data));

    if (action.payload?.id) {
      message.success(`Blog ${action.payload.isPublish ?'Published':'UnPublished'} Successfully!`,2);
      yield put(publishDataSuccess({id:action.payload.id}));
    }
    else {
      message.success(`Blog ${!store.getState().Blog.blogPublish ?'Published':'UnPublished'} Successfully!`,2);
      yield put(publishDataSuccess());
    }

  }catch (e) {
    yield put(publishDataFailure());
    errorNotification(e);
  }
}

function* updateBlogData(action){
  try {
    let data = action.payload.image ? action.payload:{};
    if(typeof action.payload.image === 'object'){
      let headers={headers:{'Content-Type':'multipart/form-data'}};
      let formData = new FormData();
      formData.append('image',action.payload.image[0].originFileObj);
      yield call(()=>deleteRequest(`${store.getState().Blog.blogImage.split('api/')[1]}`));
      const imageResponse = yield call(()=>postRequest(`files/images/${action.payload.image[0].uid}.jpg`,formData,headers));

      data = {...action.payload,image:`${process.env.REACT_APP_HOST_URL}files/${imageResponse.data.filePath}`};
    }

    const response = yield call(()=>patchRequest(`data/blog/${store.getState().Blog.blogId}`,data));
    message.success('Blog Updated Successfully!',2);
    yield put(updateBlogSuccess(response.data));
  }catch (e) {
    yield put(updateBlogFailure());
    errorNotification(e);
  }
}



export default function * rootSaga() {
  yield all([
    takeLatest(createBlog,addBlog),
    takeLatest(getBlogList,getBlogData),
    takeEvery(getSingleBlogData,getSingleBlog),
    takeEvery(deleteBlog,deleteSingleBlog),
    takeEvery(publishData,publishBlogData),
    takeLatest(updateBlog,updateBlogData),
    takeEvery(searchBlog,getBlogData),
  ])
}