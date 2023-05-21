import {memo, useEffect} from 'react';
import {Layout} from 'antd';
import 'containers/BlogDetail/style.scss';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSingleBlogData,
  getSingleBlogDataFailure,
} from 'reducers/BlogList/blogSlice';
import BlogDrawer from 'components/BlogList/BlogDrawer';
import SingleBlogPage from 'components/Common/SingleBlogPage';
const {Content} = Layout;

const BlogDetail = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const loader= useSelector(state => state.Blog.singleBlogLoader);
  const blogName = useSelector(state => state.Blog.blogName);
  const blogImage = useSelector(state => state.Blog.blogImage);
  const blogContent = useSelector(state => state.Blog.blogContent);

  useEffect(()=>{
    dispatch(getSingleBlogData(params));

    return ()=>dispatch(getSingleBlogDataFailure());
    // eslint-disable-next-line
  },[]);


  return(
    <Content className={'single-blog-page'}>
      
      <SingleBlogPage
        blogImage={blogImage}
        content={blogContent}
        name={blogName}
        loader={loader}
      />
      <BlogDrawer/>
      
    </Content>
  )
}

export default  memo(BlogDetail);