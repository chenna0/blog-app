import {Button, Layout, Pagination, Table, Tooltip} from 'antd';
import 'containers/BlogList/style.scss';
import ListHeader from 'components/BlogList/ListHeader';
import BlogDrawer from 'components/BlogList/BlogDrawer';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {deleteBlog, getBlogList, publishData, setPagination} from 'reducers/BlogList/blogSlice';
import {DeleteOutlined} from '@ant-design/icons';
import constants from 'common/utils/constants';

const {Content} = Layout;

const BlogList = () =>{

  const dispatch = useDispatch();
  const blogData = useSelector(state => state.Blog.blogList);
  const loader = useSelector(state => state.Blog.tableLoader);
  const pageTotal = useSelector(state => state.Blog.pageTotal);
  const current = useSelector(state => state.Blog.currentPage);
  const pageSize = useSelector(state => state.Blog.pageSize);
  const search = useSelector(state => state.Blog.searchParams);

  useEffect(()=>{
    dispatch(getBlogList());
    // eslint-disable-next-line
  },[current,pageSize,search]);

  const onChangePagination=(page,pageSize)=>{
    dispatch(setPagination({pageSize:pageSize,currentPage:page}));
  }

  const columns = [
    {
      title: 'Blog Title',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      ellipsis:{
        showTitle:false,
      },
      render:(text,record)=>
        <Link to={`/blog/${record.objectId}`}>
          <Tooltip placement={'topLeft'} title={text.length>44?text:''} >
            {text}
          </Tooltip>
        </Link>,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'created',
      key: 'created',
      render:(text)=>(moment(new Date(text)).format('YYYY-MM-DD HH-mm')),
    },
    {
      title: 'UpdatedAt',
      dataIndex: 'updated',
      key: 'updated',
      render:(text)=>(moment(new Date(text)).format('YYYY-MM-DD HH-mm')),
    },
    {
      title:'',
      dataIndex: 'isPublish',
      key:'isPublish',
      align:'center',
      width: 150,
      render:(text,record)=>(
        <>
          <DeleteOutlined style={{marginRight:10,color:'red'}} onClick={()=>dispatch(deleteBlog({id:record.objectId}))}/>
          <Button 
            type={text?'default':'primary'}
            onClick={
              ()=>dispatch(publishData({id:record.objectId,isPublish:!text}))
            }
          >
            {text?'UnPublish':' Publish '}
          </Button>
        </>
      ),
    },
  ]
  return(
    <Content className={'blog-list'}>
      <ListHeader/>
      <Table
        columns={columns}
        scroll={{y:window.innerHeight-290}}
        dataSource={blogData}
        loading={loader}
        rowKey={'objectId'}
        className={'list-table'}
        pagination={false}
      />
      {
        pageTotal > 7 && (
          <Pagination
            size={'default'}
            pageSize={pageSize}
            total={pageTotal}
            current={current}
            showSizeChanger={true}
            showTotal={(data)=>`Total ${data} Blogs`}
            className={'blog-pagination'}
            pageSizeOptions={constants.pageSizeOptions}
            onChange={onChangePagination}
          />
        )
      }
      <BlogDrawer/>
    </Content>
  )
}


export default BlogList;