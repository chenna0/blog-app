import {createSlice} from '@reduxjs/toolkit';

const initialState={
  isLoggedIn:!!sessionStorage.getItem('blog_token'),
  userToken:sessionStorage.getItem('blog_token')?JSON.parse(sessionStorage.getItem('blog_token'))?.token:null,
  firstName:'',
  lastName:'',
  email:'',
  signInLoader:false,
  appLoader:false,
  signUpLoader:false,
  userId:'',
  profileLoader:false,
  profilePicture:'',
}

const boardingSlice =createSlice({
  name:'boarding',
  initialState:initialState,
  reducers:{
    userSignIn:(state,action)=>({
      ...state,
      signInLoader:true,
    }),
    userSignInSuccess:(state,action)=>({
      ...state,
      isLoggedIn: true,
      userToken: state.userToken? state.userToken:action.payload['user-token'],
      firstName: action.payload['first_name'],
      lastName: action.payload['last_name'],
      email: action.payload.email,
      signInLoader:false,
      appLoader:false,
      signUpLoader:false,
      profilePicture:action.payload.image,
      userId:action.payload.objectId,
    }),
    userSignInFailure:(state,action)=>({
      ...state,
      signInLoader:false,
      isLoggedIn:false,
      userToken:null,
      appLoader:false,
    }),
    getUserData:(state,action)=>({
      ...state,
      appLoader: true,
    }),
    userSignOut:(state, action)=>({
      appLoader: false,
    }),
    userSignOutSuccess:(state,action)=>({
      ...state,
      firstName:'',
      lastName:'',
      email:'',
      signInLoader:false,
      appLoader:false,
      isLoggedIn:false,
      userToken:null,
      userId: null,
      profilePicture:null,
    }),
    userRegister:(state, action)=>({
      ...state,
      signUpLoader: true,
    }),
    userRegisterFailure:(state, action)=>({
      ...state,
      signUpLoader: false,
    }),
    setAppLoader:(state, action)=>({
      ...state,
      appLoader:action.payload.payload,
    }),
    addProfile:(state, action)=>({
      ...state,
      profileLoader: true,
    }),
    addProfileSuccess:(state, action)=>({
      ...state,
      profileLoader:false,
      profilePicture: action.payload.image,
    }),
    addProfileFailure:(state, action)=>({
      ...state,
      profileLoader:false,
    }),
  },
})

export const {
  userSignIn,
  userSignInSuccess,
  userSignInFailure,
  getUserData,
  userSignOut,
  userSignOutSuccess,
  userRegister,
  userRegisterFailure,
  setAppLoader,
  addProfile,
  addProfileSuccess,
  addProfileFailure,
}=boardingSlice.actions;
export default boardingSlice.reducer;