import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  submitLoader:false,
  tableLoader:false,
  blogList:[],
  showDrawer:false,
  blogName:'',
  blogImage:'',
  blogContent:'',
  blogId:'',
  blogPublish:false,
  isEditForm:false,
  singleBlogLoader:true,
  publishLoader: false,
  searchParams:'',
  pageTotal:null,
  currentPage:1,
  pageSize:7,
}

const blogSlice = createSlice({
  name:'blog',
  initialState:initialState,
  reducers:{
    createBlog:(state, action)=>({
      ...state,
      submitLoader: true,
    }),
    createBlogSuccess:(state, action)=>({
      ...state,
      submitLoader:false,
      showDrawer:false,
    }),
    createBlogFailure:(state, action)=>({
      ...state,
      submitLoader:false,
    }),
    getBlogList:(state, action)=>({
      ...state,
      tableLoader: true,
    }),
    getBlogListSuccess:(state, action)=>({
      ...state,
      blogList: action.payload.list,
      pageTotal: action.payload.total,
      tableLoader:false,
    }),
    getBlogListFailure:(state, action)=>({
      ...state,
      tableLoader:false,
    }),
    setDrawer:(state, action)=>({
      ...state,
      showDrawer: action.payload.showDrawer,
      isEditForm: action.payload.isEditForm,
    }),
    getSingleBlogData:(state, action)=>({
      ...state,
      singleBlogLoader:true,
    }),
    getSingleBlogDataSuccess:(state, action)=>({
      ...state,
      blogName: action.payload.name,
      blogContent: action.payload.content,
      blogImage: action.payload.image,
      singleBlogLoader: false,
      blogId:action.payload.objectId,
      blogPublish: action.payload.isPublish,
    }),
    getSingleBlogDataFailure:(state, action)=>({
      ...state,
      blogName: '',
      blogContent: '',
      blogImage: '',
      blogId:'',
      blogPublish:false,
      singleBlogLoader: false,
    }),
    deleteBlog:(state, action)=>({
      ...state,
      tableLoader:true,
    }),
    publishData:(state, action)=>({
      ...state,
      tableLoader:true,
      publishLoader:true,
    }),
    publishDataSuccess:(state, action)=>{
      if(action.payload?.id){
        let updatedData = state.blogList.map((data)=>{
          if(data.objectId === action.payload.id){
            return {
              ...data,
              isPublish:!data.isPublish,
            }
          }
          return data;
        });
        return {
          ...state,
          blogList:updatedData,
          tableLoader:false,
          publishLoader:false,
        };
      }else{
        return {
          ...state,
          blogPublish:!state.blogPublish,
          tableLoader:false,
          publishLoader:false,
        }
      }
    },
    publishDataFailure:(state, action)=>({
      ...state,
      publishLoader:false,
      tableLoader:false,
    }),
    updateBlog:(state, action)=>({
      ...state,
      submitLoader:true,
    }),
    updateBlogSuccess:(state, action)=>({
      ...state,
      submitLoader:false,
      isEditForm:false,
      showDrawer:false,
      blogName:action.payload.name,
      blogImage:action.payload.image,
      blogContent:action.payload.content,
    }),
    updateBlogFailure:(state, action)=>({
      ...state,
      submitLoader:false,
    }),
    searchBlog:(state, action)=>({
      ...state,
      searchParams: action.payload,
      currentPage:1,
      tableLoader:true,
    }),
    setPagination:(state,action)=>({
      ...state,
      pageSize: action.payload.pageSize,
      currentPage: action.payload.currentPage,
    }),
  },
})

export const {
  createBlog,
  createBlogSuccess,
  createBlogFailure,
  getBlogList,
  getBlogListFailure,
  getBlogListSuccess,
  setDrawer,
  getSingleBlogData,
  getSingleBlogDataSuccess,
  getSingleBlogDataFailure,
  deleteBlog,
  publishData,
  publishDataSuccess,
  publishDataFailure,
  updateBlog,
  updateBlogSuccess,
  updateBlogFailure,
  searchBlog,
  setPagination,
}=blogSlice.actions;
export default blogSlice.reducer;