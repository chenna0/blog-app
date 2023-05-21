import {Drawer} from 'antd';
import BlogCreateForm from 'components/BlogList/BlogCreateForm';
import {useDispatch, useSelector} from 'react-redux';
import {setDrawer} from 'reducers/BlogList/blogSlice';

const BlogDrawer = () => {
  const dispatch =useDispatch();
  const isOpen = useSelector(state => state.Blog.showDrawer);
  const isEdit = useSelector(state => state.Blog.isEditForm);
  const onClose = ()=>{
    dispatch(setDrawer({showDrawer:false,isEditForm: false}));
  }
  return(
    <Drawer
      title={isEdit?'Edit':'Create'}
      placement={'right'}
      onClose={onClose}
      open={isOpen}
      rootClassName={'blog-drawer'}
      destroyOnClose={true}
    >
      <BlogCreateForm/>
    </Drawer>
  )
}

export default BlogDrawer;