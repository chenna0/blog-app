import {Button, Card, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {searchBlog, setDrawer} from 'reducers/BlogList/blogSlice';
import {DebounceInput} from 'react-debounce-input';
import {useEffect, useState} from 'react';

const ListHeader = () => {

  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  const params = useSelector(state => state.Blog.searchParams)
  const onChange=(data)=>{
    setSearch(data.target.value);
    dispatch(searchBlog(data.target.value));
  }

  useEffect(()=>{
    setSearch(params);
  },[params]);
  const openDrawer=()=>{
    dispatch(setDrawer({showDrawer:true,isEditForm: false}));
  }
  return(
    <Card className={'title'}>
      <span className={'name'}>Blogs</span>
      <span className={'align-right'}>
        <DebounceInput
          placeholder={'Search'}
          element={Input}
          suffix={<SearchOutlined />}
          minLength={1}
          debounceTimeout={400}
          onChange={onChange}
          value={search}
        />
        <Button type={'primary'} onClick={openDrawer}>Create</Button>
      </span>
    </Card>
  )
}

export default ListHeader;