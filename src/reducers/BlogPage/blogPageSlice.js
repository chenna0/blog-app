import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  blogList:[],
  sideLoader:false,
  current:1,
  pageTotal:0,
  searchParams:'',
  pageSize:Math.round((window.innerHeight-65)/100)+2,
  name:'',
  image:'',
  content:'',
  selected:'',
}


const blogPageSlice =createSlice({
  name:'blogPage',
  initialState:initialState,
  reducers:{
    getSideList:(state, action)=>({
      ...state,
      current:action.payload.current,
      sideLoader: true,
    }),
    getSideListSuccess:(state, action)=>({
      ...state,
      sideLoader:false,
      blogList: state.current === 1 ? action.payload.list : [...state.blogList,...action.payload.list],
      pageTotal: action.payload.total,
      name: state.current === 1 ? action.payload.list[0].name:state.name,
      image: state.current === 1 ? action.payload.list[0].image:state.image,
      content: state.current === 1 ? action.payload.list[0].content:state.content,
      selected: state.current === 1 ? action.payload.list[0].objectId:state.selected,
    }),
    getSideListFailure:(state, action)=>({
      ...state,
      sideLoader:false,
    }),
    setSearchParams:(state, action)=>({
      ...state,
      current:1,
      searchParams: action.payload,
    }),
    setSelectedBlog:(state, action)=>({
      ...state,
      name:action.payload.name,
      image:action.payload.image,
      content:action.payload.content,
      selected:action.payload.objectId,
      sideLoader:false,
    }),
    setBlogPageUnmount:(state, action)=>({
      ...state,
      name:'',
      image:'',
      content:'',
      current:1,
      blogList:[],
      pageTotal:0,
      selected: null,
    }),
  },
})

export const {
  getSideList,
  getSideListSuccess,
  getSideListFailure,
  setSearchParams,
  setSelectedBlog,
  setBlogPageUnmount,
}=blogPageSlice.actions;

export default blogPageSlice.reducer;