import {Card, Input, Layout, List, Space, Spin, Typography} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {DebounceInput} from 'react-debounce-input';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getSideList, setSearchParams, setSelectedBlog} from 'reducers/BlogPage/blogPageSlice';



const {Sider}=Layout;
const {Title,Paragraph} = Typography;
const BlogSider = () => {

  const dispatch = useDispatch();
  const dataList = useSelector(state => state.BlogPage.blogList);
  const loader = useSelector(state => state.BlogPage.sideLoader);
  const total = useSelector(state => state.BlogPage.pageTotal);
  const search =useSelector(state => state.BlogPage.searchParams);
  const current =useSelector(state => state.BlogPage.current);
  const selected =useSelector(state => state.BlogPage.selected);
  const onChange = (e)=>{
    dispatch(setSearchParams(e.target.value))
  }

  const setBlogData =(data)=>{
    dispatch(setSelectedBlog(data));
  }

  useEffect(()=>{
    dispatch(getSideList({current:1}));
    // eslint-disable-next-line
  },[search]);

  return(
    <Sider className={'blog-sider'}>
      <Card className={'blog-search'}>
        <Title level={5}>Recent Blogs</Title>
        <DebounceInput
          placeholder={'Search'}
          element={Input}
          suffix={<SearchOutlined />}
          minLength={1}
          debounceTimeout={400}
          onChange={onChange}
          value={search}
        />
      </Card>
      <div id={'scrollableDiv'} className={'scroll-container'} style={{height:window.innerHeight-165}}>

        <InfiniteScroll
          dataLength={dataList.length}
          hasMore={dataList.length < total}
          next={()=>dispatch(getSideList({current:current+1}))}
          scrollableTarget={'scrollableDiv'}
        >
          <List
            dataSource={dataList}
            renderItem={(item) => (
              <Space
                direction="vertical"
                size={'large'}
                style={{
                  display: 'flex',
                  marginTop:10,
                }}
              >
                <Card
                  size="small"
                  className={`blog-items ${selected === item.objectId?'selected':''}`}
                  onClick={()=>setBlogData(item)}
                  key={item.objectId}
                >
                  <Paragraph ellipsis={{rows:2}}>{item.name}</Paragraph>
                </Card>
              </Space>
            )}
            className={'side-blog-list'}
          >
            { loader && (
              <div className={'demo-loading-container'}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>

      </div>
    </Sider>
  )
}

export default BlogSider;