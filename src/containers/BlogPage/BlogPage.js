import {Layout, Spin} from 'antd';
import BlogSider from 'components/BlogPage/BlogSider';
import 'containers/BlogPage/style.scss';
import SingleBlogPage from 'components/Common/SingleBlogPage';
import {useDispatch, useSelector} from 'react-redux';
import {memo, useEffect} from 'react';
import {setBlogPageUnmount} from 'reducers/BlogPage/blogPageSlice';
import {LoadingOutlined} from '@ant-design/icons';

const {Content} = Layout;
const BlogPage = () =>{
  const image = useSelector(state => state.BlogPage.image);
  const name = useSelector(state => state.BlogPage.name);
  const content = useSelector(state => state.BlogPage.content);
  const loader = useSelector(state => state.BlogPage.sideLoader);
  const current =useSelector(state => state.BlogPage.current);
  const dispatch = useDispatch();
  
  useEffect(()=>
    ()=>dispatch(setBlogPageUnmount())
    // eslint-disable-next-line
  ,[]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 35,
      }}
      spin
    />
  );

  return(
    <Layout>
      <BlogSider/>
      <Content className={`single-blog-page ${loader?'loader-blog-page':''}`}>
        {
          loader && current === 1 ?(
            <Spin indicator={antIcon}/>
          ):(
            <SingleBlogPage blogImage={image} name={name} content={content}/>
          )
        }
      </Content>
    </Layout>
  )
}

export default memo(BlogPage);