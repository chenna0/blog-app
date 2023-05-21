import {takeLatest,takeEvery, all, call, put} from 'redux-saga/effects';
import {
  addProfile,
  addProfileFailure,
  addProfileSuccess,
  getUserData,
  setAppLoader,
  userRegister,
  userRegisterFailure,
  userSignIn,
  userSignInFailure,
  userSignInSuccess,
  userSignOut,
  userSignOutSuccess,
} from 'reducers/Boarding/boardingSlice';
import {deleteRequest, getRequest, patchRequest, postRequest} from 'common/utils/axiosClient';
import { message } from 'antd';
import {store} from 'store/store';
import {errorNotification} from 'common/utils/common';




function* userLogIn(action){
  try {
    const response = yield call(()=>postRequest('users/login',action.payload));
    yield put(userSignInSuccess(response.data));
    message.success('User LoggedIn Successfully!',2);
    sessionStorage.setItem('blog_token',JSON.stringify({token:response.data['user-token'],objectId:response.data.ownerId}));
  }
  catch (e) {
    yield put(userSignInFailure());
    errorNotification(e);
  }
}

function* getUser(action){
  try {
    const owner = JSON.parse(sessionStorage.getItem('blog_token'))?.objectId;
    const response = yield call(()=>getRequest(`users/${owner}`));
    yield put(userSignInSuccess(response.data));
  }
  catch (e) {
    yield put(userSignInFailure());
    errorNotification(e);
  }
}

function* signOut(action){
  try {
    yield call(()=>getRequest('users/logout'));
    sessionStorage.clear();
    yield put(userSignOutSuccess());
    message.success('User LoggedOut Successfully!',2);
  }
  catch (e) {
    yield put(userSignInFailure());
    errorNotification(e);
  }
}

function * registerUser(action){
  try {
    yield call(()=>postRequest('users/register',action.payload));
    message.success('User Registered Successfully!',2);
    yield put(setAppLoader({payload:true}));
    yield put(userSignIn({
      login:action.payload.email,
      password:action.payload.password,
    },
    ))
  }
  catch (e) {
    yield put(userRegisterFailure());
    errorNotification(e);
  }
}

function* addProfilePicture(action) {
  try {
    let data = {};
    let headers = {headers: {'Content-Type': 'multipart/form-data'}};
    let formData = new FormData();
    formData.append('image', action.payload.image[0].originFileObj);
    yield call(()=>deleteRequest(`${store.getState().Auth.profilePicture.split('api/')[1]}`));
    const imageResponse = yield call(() => postRequest(`files/profile/${action.payload.image[0].uid}.jpg`, formData, headers));
    data = {image: `${process.env.REACT_APP_HOST_URL}files/${imageResponse.data.filePath}`};
    const response = yield call(()=>patchRequest(`data/users/${store.getState().Auth.userId}`,data));
    message.success('Profile Picture Updated Successfully!',2);
    yield put(addProfileSuccess({image: response.data.image}));
  }catch (e) {
    yield put(addProfileFailure());
    errorNotification(e);
  }
}


export default function* rootSaga(){
  yield all([
    takeLatest(userSignIn,userLogIn),
    takeEvery(getUserData,getUser),
    takeEvery(userSignOut,signOut),
    takeLatest(userRegister,registerUser),
    takeEvery(addProfile,addProfilePicture),
  ]);
}