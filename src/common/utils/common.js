import {getUserData} from 'reducers/Boarding/boardingSlice';
import {message} from 'antd';
export const userSessionCheck=(dispatch)=>{
  let session = JSON.parse(sessionStorage.getItem('blog_token'));

  if(session?.token){
    dispatch(getUserData());
  }
}

export const errorNotification =(error)=>{
  if(error.name === 'AxiosError'){
    message.error(error.response.data.message);
  }
}